export const raise = (error: Error | string): never => {
  if (typeof error === "string") {
    throw new Error(error);
  }

  throw error;
};
