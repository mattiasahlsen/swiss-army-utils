export const asyncReduce = async <Item, Result>(
  items: Item[],
  reducer: (result: Result, item: Item) => Promise<Result>,
  initialResult: Result
): Promise<Result> => {
  let result = initialResult;
  for (const item of items) {
    result = await reducer(result, item);
  }
  return result;
};
