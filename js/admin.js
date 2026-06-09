export function updateListingStatus(items, id, status) {
  return items.map((item) => item.id === id ? { ...item, status } : item);
}

export function summarizeListings(items) {
  return items.reduce((summary, item) => {
    summary.total += 1;
    summary[item.status] = (summary[item.status] || 0) + 1;
    summary.views += item.views || 0;
    summary.leads += item.leads || 0;
    return summary;
  }, { total: 0, active: 0, pending: 0, views: 0, leads: 0 });
}
