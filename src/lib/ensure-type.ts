export function ensureType(arg: unknown, type: string): boolean {
  return Object.prototype.toString.call(arg).toLowerCase().includes(type);
}
