export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (typeof error === 'object' && error !== null) {
    return JSON.stringify(error);
  }

  return 'An unknown error occurred';
}
