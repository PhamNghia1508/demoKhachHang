import test from "node:test";
import assert from "node:assert/strict";
import { fallbackImage, imageStyle } from "./image-fallback.js";

test("fallbackImage creates a stable local visual placeholder", () => {
  assert.match(fallbackImage("Căn hộ Quận 1"), /^data:image\/svg\+xml/);
});

test("imageStyle includes primary and fallback image sources", () => {
  const style = imageStyle("https://example.com/home.jpg", "Căn hộ");
  assert.match(style, /example\.com\/home\.jpg/);
  assert.match(style, /data:image\/svg\+xml/);
});
