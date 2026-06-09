import { listings, filterListings, sortListings } from "./listings.js";
import { updateListingStatus, summarizeListings } from "./admin.js";

const grid = document.querySelector("#listing-grid");
const empty = document.querySelector("#empty-state");
const heroSearch = document.querySelector("#hero-search");
const priceFilter = document.querySelector("#price-filter");
const sortSelect = document.querySelector("#sort");
let filters = {};
let adminListings = listings.slice(0, 5).map((item, index) => ({ ...item, status: index < 3 ? "active" : "pending", views: 350 + index * 410, leads: 4 + index * 3 }));

const money = (value) => `${value} triệu/tháng`;

function render() {
  const result = sortListings(filterListings(listings, filters), sortSelect.value);
  grid.innerHTML = result.map((item) => `<article class="listing-card">
    <div class="card-image" style="background-image:url('${item.image}')">
      ${item.verified ? '<span class="verified">✓ Đã xác minh</span>' : ""}
      <button class="heart" aria-label="Lưu tin">♡</button>
    </div>
    <div class="card-body"><small>${item.type} · ${item.district}</small><h3>${item.title}</h3>
      <div class="meta"><span>${item.area} m²</span><span>${item.bedrooms || "Studio"} PN</span><span>${item.bathrooms} WC</span></div>
      <div class="price-row"><strong>${money(item.price)}</strong><button data-detail="${item.id}">Xem chi tiết</button></div>
    </div></article>`).join("");
  empty.hidden = result.length > 0;
}

heroSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  filters = Object.fromEntries(new FormData(heroSearch).entries());
  filters.maxPrice = priceFilter.value;
  render();
  document.querySelector("#listings").scrollIntoView();
});

priceFilter.addEventListener("change", () => { filters.maxPrice = priceFilter.value; render(); });
sortSelect.addEventListener("change", render);
document.querySelector("#reset-filter").addEventListener("click", () => { filters = {}; heroSearch.reset(); priceFilter.value = ""; render(); });
document.querySelectorAll("[data-keyword]").forEach((button) => button.addEventListener("click", () => {
  heroSearch.elements.keyword.value = button.dataset.keyword;
  heroSearch.requestSubmit();
}));

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-detail]");
  if (detailButton) openDetail(Number(detailButton.dataset.detail));
  const opener = event.target.closest("[data-open]");
  if (opener) document.querySelector(`#${opener.dataset.open}`).showModal();
  if (event.target.matches("[data-close]")) event.target.closest("dialog").close();
  if (event.target.matches(".heart")) { event.target.textContent = event.target.textContent === "♡" ? "♥" : "♡"; showToast("Đã cập nhật danh sách yêu thích"); }
  const adminAction = event.target.closest("[data-admin-action]");
  if (adminAction) {
    adminListings = updateListingStatus(adminListings, Number(adminAction.dataset.id), adminAction.dataset.adminAction);
    renderAdmin();
    showToast(adminAction.dataset.adminAction === "active" ? "Tin đăng đã được duyệt và hiển thị." : "Tin đăng đã được từ chối.");
  }
  const packageButton = event.target.closest("[data-package]");
  if (packageButton) {
    document.querySelector("#contact-modal h2").textContent = `Tư vấn ${packageButton.dataset.package}`;
    document.querySelector("#contact-modal").showModal();
  }
});

function renderAdmin() {
  const summary = summarizeListings(adminListings);
  document.querySelector("#admin-metrics").innerHTML = `<article><small>Tổng tin</small><strong>${summary.total}</strong></article><article><small>Đang hiển thị</small><strong>${summary.active}</strong></article><article><small>Chờ duyệt</small><strong>${summary.pending}</strong></article><article><small>Khách quan tâm</small><strong>${summary.leads}</strong></article>`;
  document.querySelector("#admin-list").innerHTML = adminListings.map((item) => `<article><img src="${item.image}" alt=""><div><strong>${item.title}</strong><small>${item.district} · ${money(item.price)} · ${item.views} lượt xem</small></div><span class="pill ${item.status === "active" ? "green" : "orange"}">${item.status === "active" ? "Đang hiển thị" : item.status === "pending" ? "Chờ duyệt" : "Đã từ chối"}</span><div class="admin-actions">${item.status === "pending" ? `<button data-admin-action="active" data-id="${item.id}">Duyệt</button><button data-admin-action="rejected" data-id="${item.id}">Từ chối</button>` : "<em>Đã xử lý</em>"}</div></article>`).join("");
}

function openDetail(id) {
  const item = listings.find((listing) => listing.id === id);
  document.querySelector("#detail-content").innerHTML = `<div class="detail-image" style="background-image:url('${item.image}')"></div><div class="detail-body">
    <span class="eyebrow">${item.type} · ${item.district}</span><h2>${item.title}</h2><div class="detail-price">${money(item.price)}</div>
    <div class="detail-meta"><span>${item.area} m²</span><span>${item.bedrooms || "Studio"} phòng ngủ</span><span>${item.bathrooms} phòng tắm</span></div>
    <p>${item.description}</p><div class="amenities">${item.amenities.map((a) => `<span>✓ ${a}</span>`).join("")}</div>
    <div class="detail-actions"><button class="primary-btn" data-open="contact-modal">Đặt lịch xem nhà</button><button class="ghost-btn" style="color:#102a43;border-color:#ccd6dd" onclick="this.textContent='Hotline: 090 123 4567'">Hiện số điện thoại</button></div></div>`;
  document.querySelector("#detail-modal").showModal();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.closest("dialog").close();
  event.target.reset();
  showToast("Đặt lịch thành công! Chuyên viên sẽ sớm liên hệ.");
});

let postStep = 0;
document.querySelector("#post-next").addEventListener("click", () => {
  const steps = [...document.querySelectorAll(".post-step")];
  const indicators = [...document.querySelectorAll(".steps i")];
  if (postStep < 2) {
    steps[postStep].classList.remove("active");
    postStep += 1;
    steps[postStep].classList.add("active");
    indicators[postStep].classList.add("active");
    document.querySelector("#post-next").textContent = postStep === 2 ? "Gửi tin kiểm duyệt" : "Tiếp tục";
  } else {
    document.querySelector("#post-modal").close();
    showToast("Tin đăng mẫu đã được gửi kiểm duyệt.");
    steps.forEach((step, index) => step.classList.toggle("active", index === 0));
    indicators.forEach((item, index) => item.classList.toggle("active", index === 0));
    postStep = 0;
    document.querySelector("#post-next").textContent = "Tiếp tục";
  }
});

render();
renderAdmin();
