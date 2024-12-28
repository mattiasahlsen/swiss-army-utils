export const createRange = (length: number) => {
  if (length < 0) {
    throw new Error("Length must be a positive number");
  }

  return Array.from({ length }, (_, i) => i);
};
