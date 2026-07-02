// Small unique-id generator: timestamp + random suffix.
// Good enough for local-only data (no distributed uniqueness needed).
export function makeId(): string {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}
