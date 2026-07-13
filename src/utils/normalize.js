export function normalizeTitle(value) {
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}
