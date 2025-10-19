/**
 * Type guard that checks if a value is neither undefined nor null.
 * This is useful for filtering arrays and narrowing types in TypeScript.
 *
 * @param value - The value to check for being defined.
 * @returns True if the value is not undefined and not null, false otherwise.
 *
 * @example
 * ```ts
 * const values = [1, null, 2, undefined, 3];
 * const definedValues = values.filter(isDefined);
 * // returns [1, 2, 3]
 *
 * const maybeValue: string | null | undefined = getOptionalValue();
 * if (isDefined(maybeValue)) {
 *   // TypeScript knows maybeValue is string here
 *   console.log(maybeValue.toUpperCase());
 * }
 * ```
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}
