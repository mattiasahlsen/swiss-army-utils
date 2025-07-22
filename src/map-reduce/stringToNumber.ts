export function stringToNumber(value: string): number {
  if (value.trim() === '') {
    throw new Error(`Invalid number: ${value}`);
  }

  const parsedValue = Number(value);

  if (isNaN(parsedValue) || !isFinite(parsedValue)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return parsedValue;
}
