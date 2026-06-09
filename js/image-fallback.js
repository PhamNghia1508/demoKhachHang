export function fallbackImage(label = "Bat dong san") {
  const safeLabel = String(label).replace(/[<>&"']/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#102a43"/><stop offset="1" stop-color="#285477"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><path d="M350 510V350l250-180 250 180v160H700V390H500v120z" fill="#f47b35"/><text x="600" y="610" text-anchor="middle" fill="white" font-family="Arial" font-size="38" font-weight="700">${safeLabel}</text><text x="600" y="660" text-anchor="middle" fill="#c8d7e2" font-family="Arial" font-size="22">Hinh anh dang duoc cap nhat</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function imageStyle(primary, label) {
  return `background-image:url("${primary}"),url("${fallbackImage(label)}")`;
}
