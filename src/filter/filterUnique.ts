export const filterUnique = <T>(
  items: T[],
  getKey: (item: T) => string | number | bigint
): T[] => {
  const map = new Map();
  items.forEach((item) => map.set(getKey(item), item));
  return Array.from(map.values());
};
