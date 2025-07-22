export function filterObjectFields<Value>(
  object: Record<string, Value>,
  filter: (value: Value, key: string) => boolean
): Record<string, Value> {
  const filteredObject: Record<string, Value> = {};

  for (const key in object) {
    if (filter(object[key], key)) {
      filteredObject[key] = object[key];
    }
  }

  return filteredObject;
}
