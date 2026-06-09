export const listings = [
  {
    id: 1,
    title: "Nhà phố sân vườn tại Thảo Điền",
    district: "TP. Thủ Đức",
    type: "Nhà phố",
    price: 28,
    area: 120,
    bedrooms: 3,
    bathrooms: 3,
    featured: true,
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Không gian sống riêng tư, nhiều ánh sáng, phù hợp gia đình trẻ và chuyên gia.",
    amenities: ["Sân vườn", "Nội thất", "Chỗ đậu ô tô"]
  },
  {
    id: 2,
    title: "Căn hộ view sông ngay trung tâm",
    district: "Quận 1",
    type: "Căn hộ",
    price: 18,
    area: 75,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    verified: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267d?auto=format&fit=crop&w=1200&q=80",
    description: "Căn hộ đầy đủ nội thất, ban công thoáng và tiện di chuyển đến khu trung tâm.",
    amenities: ["Hồ bơi", "Phòng gym", "Bảo vệ 24/7"]
  },
  {
    id: 3,
    title: "Mặt bằng kinh doanh góc hai mặt tiền",
    district: "Quận 3",
    type: "Mặt bằng",
    price: 42,
    area: 160,
    bedrooms: 0,
    bathrooms: 2,
    featured: true,
    verified: true,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    description: "Vị trí nhận diện tốt, phù hợp showroom, văn phòng đại diện hoặc thương hiệu F&B.",
    amenities: ["Mặt tiền", "Chỗ đậu xe", "Khu đông dân"]
  },
  {
    id: 4,
    title: "Nhà nguyên căn hẻm ô tô yên tĩnh",
    district: "Bình Thạnh",
    type: "Nhà nguyên căn",
    price: 16,
    area: 88,
    bedrooms: 3,
    bathrooms: 2,
    featured: false,
    verified: true,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    description: "Nhà mới sơn sửa, khu dân cư an ninh, cách trung tâm chỉ vài phút di chuyển.",
    amenities: ["Hẻm ô tô", "Ban công", "Cho nuôi thú cưng"]
  },
  {
    id: 5,
    title: "Studio hiện đại gần sân bay",
    district: "Phú Nhuận",
    type: "Căn hộ",
    price: 9,
    area: 42,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    verified: true,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description: "Studio tối ưu công năng, phù hợp người trẻ cần không gian tiện nghi và linh hoạt.",
    amenities: ["Nội thất", "Thang máy", "Khóa thông minh"]
  },
  {
    id: 6,
    title: "Biệt thự hồ bơi khu compound",
    district: "Quận 7",
    type: "Biệt thự",
    price: 65,
    area: 320,
    bedrooms: 5,
    bathrooms: 5,
    featured: true,
    verified: true,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    description: "Biệt thự cao cấp trong khu compound an ninh, phù hợp gia đình đa thế hệ.",
    amenities: ["Hồ bơi riêng", "Sân vườn", "An ninh 24/7"]
  },
  {
    id: 7,
    title: "Văn phòng trọn gói cho đội ngũ 20 người",
    district: "Quận 10",
    type: "Văn phòng",
    price: 24,
    area: 110,
    bedrooms: 0,
    bathrooms: 2,
    featured: false,
    verified: true,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    description: "Không gian làm việc hoàn thiện, có phòng họp và khu pantry dùng chung.",
    amenities: ["Phòng họp", "Lễ tân", "Internet"]
  },
  {
    id: 8,
    title: "Nhà phố kinh doanh gần chợ",
    district: "Gò Vấp",
    type: "Nhà phố",
    price: 20,
    area: 105,
    bedrooms: 4,
    bathrooms: 3,
    featured: false,
    verified: false,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    description: "Nhà phố rộng, tuyến đường đông đúc, có thể kết hợp ở và kinh doanh.",
    amenities: ["Kinh doanh", "Ban công", "Kho chứa đồ"]
  }
];

const normalize = (value = "") =>
  String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function filterListings(items, filters = {}) {
  const keyword = normalize(filters.keyword);
  return items.filter((item) => {
    const haystack = normalize(`${item.title} ${item.district} ${item.type}`);
    return (!keyword || haystack.includes(keyword))
      && (!filters.district || item.district === filters.district)
      && (!filters.type || item.type === filters.type)
      && (!filters.maxPrice || item.price <= Number(filters.maxPrice));
  });
}

export function sortListings(items, sort = "featured") {
  const result = [...items];
  if (sort === "price-asc") return result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return result.sort((a, b) => b.price - a.price);
  if (sort === "area-desc") return result.sort((a, b) => b.area - a.area);
  return result.sort((a, b) => Number(b.featured) - Number(a.featured));
}
