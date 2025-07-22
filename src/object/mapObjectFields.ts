export function mapObjectFields<TMapped, TResult>(
  obj: Record<string, TMapped>,
  mapFn: (keyValueTuple: [string, TMapped]) => [string, TResult]
): Record<string, TResult> {
  return Object.fromEntries(Object.entries(obj).map(mapFn));
}
