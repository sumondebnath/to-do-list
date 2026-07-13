export function createId() {
  // Good enough for a client-only app; avoids external deps.
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}
