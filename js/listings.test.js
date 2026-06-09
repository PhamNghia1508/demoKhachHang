import test from "node:test";
import assert from "node:assert/strict";
import { filterListings, sortListings } from "./listings.js";

const sample = [
  { id: 1, title: "Nha pho Thao Dien", district: "Thu Duc", type: "Nha pho", price: 28, area: 120, featured: true },
  { id: 2, title: "Can ho trung tam", district: "Quan 1", type: "Can ho", price: 18, area: 75, featured: false },
  { id: 3, title: "Mat bang kinh doanh", district: "Quan 3", type: "Mat bang", price: 42, area: 160, featured: true },
];

test("filterListings matches keyword without case sensitivity", () => {
  assert.deepEqual(filterListings(sample, { keyword: "TRUNG TAM" }).map((item) => item.id), [2]);
});

test("filterListings combines district, type and price range", () => {
  const filters = { district: "Thu Duc", type: "Nha pho", maxPrice: 30 };
  assert.deepEqual(filterListings(sample, filters).map((item) => item.id), [1]);
});

test("filterListings returns every listing for empty filters", () => {
  assert.equal(filterListings(sample, {}).length, 3);
});

test("sortListings sorts by lowest price without mutating input", () => {
  const sorted = sortListings(sample, "price-asc");
  assert.deepEqual(sorted.map((item) => item.id), [2, 1, 3]);
  assert.deepEqual(sample.map((item) => item.id), [1, 2, 3]);
});

test("sortListings prioritizes featured listings by default", () => {
  assert.deepEqual(sortListings(sample, "featured").map((item) => item.id), [1, 3, 2]);
});
