import test from "node:test";
import assert from "node:assert/strict";
import { updateListingStatus, summarizeListings } from "./admin.js";

const items = [
  { id: 1, status: "active", views: 120, leads: 8 },
  { id: 2, status: "pending", views: 30, leads: 2 },
  { id: 3, status: "pending", views: 0, leads: 0 }
];

test("updateListingStatus changes only the selected listing", () => {
  const result = updateListingStatus(items, 2, "active");
  assert.equal(result.find((item) => item.id === 2).status, "active");
  assert.equal(result.find((item) => item.id === 1).status, "active");
  assert.equal(items.find((item) => item.id === 2).status, "pending");
});

test("summarizeListings calculates operational dashboard metrics", () => {
  assert.deepEqual(summarizeListings(items), {
    total: 3,
    active: 1,
    pending: 2,
    views: 150,
    leads: 10
  });
});
