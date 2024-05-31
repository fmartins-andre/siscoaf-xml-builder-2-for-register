export function groupToArray<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
): T[][] {
  const groups = new Map<string, T[]>();

  array.forEach((item) => {
    const groupKey = String(item[key]);
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(item);
  });

  return Array.from(groups.values());
}
