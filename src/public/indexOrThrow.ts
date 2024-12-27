export const indexOrThrow = <T>(items: T[], index: number): T => {
  const item = items[index];

  if (item === undefined) {
    throw new Error(`No item found at index ${index}`);
  }

  return item;
};
