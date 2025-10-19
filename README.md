# swiss-army-utils

A collection of general-purpose TypeScript utilities for common programming tasks. This library provides type-safe, well-tested utility functions organized into logical categories.

## Installation

```bash
npm install swiss-army-utils
```

## Usage

Import utilities directly from their category paths:

```typescript
import { isDefined } from 'swiss-army-utils/filter/isDefined';
import { asyncMap } from 'swiss-army-utils/map-reduce/asyncMap';
import { sleep } from 'swiss-army-utils/functions/sleep';
```

## API Documentation

### Functions

<dl>
<dt><a href="#filterUnique">filterUnique(items, getKey)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Filters an array to keep only unique items based on a key extraction function.
When duplicate keys are found, the last occurrence is kept.</p>
</dd>
<dt><a href="#isDefined">isDefined(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Type guard that checks if a value is neither undefined nor null.
This is useful for filtering arrays and narrowing types in TypeScript.</p>
</dd>
<dt><a href="#findOrThrow">findOrThrow(arr, predicate)</a> ⇒ <code>T</code></dt>
<dd><p>Finds the first item in the array that matches the predicate, throwing an error if no match is found.</p>
</dd>
<dt><a href="#firstOrThrow">firstOrThrow(items)</a> ⇒ <code>T</code></dt>
<dd><p>Returns the first item in the array, throwing an error if the array is empty.</p>
</dd>
<dt><a href="#indexOrThrow">indexOrThrow(items, index)</a> ⇒ <code>T</code></dt>
<dd><p>Returns the item at the specified index in the array, throwing an error if the index is out of bounds.</p>
</dd>
<dt><a href="#makeThrottled">makeThrottled(options, fn)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a throttled version of a function that enforces a minimum delay between executions.
Multiple calls made during the delay period will share the same promise and return the same result.
After the delay period, subsequent calls will trigger a new execution.</p>
</dd>
<dt><a href="#sleep">sleep(ms)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Asynchronously pauses execution for a specified duration.
Returns a promise that resolves after the given number of milliseconds.</p>
</dd>
<dt><a href="#asTuple">asTuple(arr)</a> ⇒ <code>T</code></dt>
<dd><p>Type-level function that ensures the input array is treated as a tuple type.
This is useful for preserving exact array literal types.</p>
</dd>
<dt><a href="#asyncFlatMap">asyncFlatMap(array, mapper)</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Asynchronously maps over an array or async iterable and flattens the results.
Equivalent to calling asyncMap followed by Array.flat().
The mapping is performed sequentially to maintain order.</p>
</dd>
<dt><a href="#asyncMap">asyncMap(iterator, mapper)</a> ⇒ <code>Promise.&lt;Array.&lt;R&gt;&gt;</code></dt>
<dd><p>Asynchronously maps over an array or async iterable, applying an async mapper function to each item.
The mapping is performed sequentially (not in parallel) to maintain order and avoid overwhelming resources.</p>
</dd>
<dt><a href="#asyncReduce">asyncReduce(items, reducer, initialResult)</a> ⇒ <code>Promise.&lt;Result&gt;</code></dt>
<dd><p>Asynchronously reduces an array to a single value using an async reducer function.
The reduction is performed sequentially, processing one item at a time.</p>
</dd>
<dt><a href="#batchArray">batchArray(array, batchSize)</a> ⇒ <code>Array.&lt;Array.&lt;T&gt;&gt;</code></dt>
<dd><p>Splits an array into smaller arrays (batches) of a specified size.
Each batch will contain at most <code>batchSize</code> items.</p>
</dd>
<dt><a href="#batchArrayByWeights">batchArrayByWeights(items, batchSize, getWeight)</a> ⇒ <code>Array.&lt;Array.&lt;T&gt;&gt;</code></dt>
<dd><p>Splits an array into smaller arrays (batches) based on weighted sizes.
Items are grouped into batches where the total weight doesn&#39;t exceed the specified batch size.</p>
</dd>
<dt><a href="#batchAsyncIterableByWeights">batchAsyncIterableByWeights(items, batchSize, getWeight)</a></dt>
<dd><p>Asynchronously splits an async iterable into batches based on weighted sizes.
Items are grouped into batches where the total weight doesn&#39;t exceed the specified batch size.
This is an async generator that yields batches as they are formed.</p>
</dd>
<dt><a href="#groupBy">groupBy(array, getKey, initialValue)</a> ⇒ <code>Record.&lt;Key, Array.&lt;T&gt;&gt;</code></dt>
<dd><p>Groups the elements of an array based on a key derived from each element.</p>
</dd>
<dt><a href="#pluckIds">pluckIds(items, idGetter)</a> ⇒ <code>Array</code></dt>
<dd><p>Extracts unique IDs from an array of objects using an ID getter function.
The function flattens nested arrays up to 10 levels deep, filters out null/undefined values,
and returns a deduplicated array of IDs.</p>
</dd>
<dt><a href="#roundToDecimals">roundToDecimals(value, decimals)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#stringToNumber">stringToNumber(value)</a> ⇒ <code>number</code></dt>
<dd><p>Safely converts a string to a number with validation.
Throws an error if the string cannot be converted to a valid finite number.</p>
</dd>
<dt><a href="#toSorted">toSorted(array, getKey, order)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Sorts an array by a key extracted from each item, returning a new sorted array.
The original array is not modified.</p>
</dd>
<dt><a href="#createRange">createRange(length)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Creates an array of consecutive integers from 0 to length-1.</p>
</dd>
<dt><a href="#createSingletonAsync">createSingletonAsync(options)</a> ⇒ <code>function</code></dt>
<dd><p>Creates an async singleton that lazily fetches and caches a value.
The cached value is validated before each use and refreshed if invalid.
Handles concurrent calls by ensuring only one fetch happens at a time.</p>
</dd>
<dt><a href="#createSingletonSync">createSingletonSync(options)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a synchronous singleton that lazily fetches and caches a value.
The cached value is validated before each use and refreshed if invalid.</p>
</dd>
<dt><a href="#callInOrderWithErrorHandling">callInOrderWithErrorHandling(handlers, params)</a></dt>
<dd><p>Calls all handlers in order, collecting errors and throwing them at the end.
If only one error occurs, throws that error directly.
If multiple errors occur, throws an AggregateError.</p>
</dd>
<dt><a href="#createSubject">createSubject()</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a subject (observable) for event-driven programming.
Allows subscribers to listen for events and emit events to all subscribers.
Handlers are called in order, and all handlers are executed even if some fail.</p>
</dd>
<dt><a href="#mergeSubjects">mergeSubjects(subjects)</a> ⇒ <code>Object</code></dt>
<dd><p>Merges multiple subjects into a single subscribable subject.
A handler subscribed to the merged subject will receive events from all source subjects.
Note: The merged subject cannot emit events, only subscribe to them.</p>
</dd>
</dl>

<a name="filterUnique"></a>

### filterUnique(items, getKey) ⇒ <code>Array.&lt;T&gt;</code>
Filters an array to keep only unique items based on a key extraction function.
When duplicate keys are found, the last occurrence is kept.

**Kind**: global function  
**Returns**: <code>Array.&lt;T&gt;</code> - An array containing only unique items based on the extracted keys.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;T&gt;</code> | The array of items to filter. |
| getKey | <code>function</code> | Function that extracts a unique key from each item. |

**Example**  
```ts
const items = [
  { id: '1', name: 'a' },
  { id: '2', name: 'b' },
  { id: '1', name: 'c' }
];
filterUnique(items, (item) => item.id);
// returns [{ id: '1', name: 'c' }, { id: '2', name: 'b' }]
```
<a name="isDefined"></a>

### isDefined(value) ⇒ <code>boolean</code>
Type guard that checks if a value is neither undefined nor null.
This is useful for filtering arrays and narrowing types in TypeScript.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the value is not undefined and not null, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>T</code> \| <code>undefined</code> \| <code>null</code> | The value to check for being defined. |

**Example**  
```ts
const values = [1, null, 2, undefined, 3];
const definedValues = values.filter(isDefined);
// returns [1, 2, 3]

const maybeValue: string | null | undefined = getOptionalValue();
if (isDefined(maybeValue)) {
  // TypeScript knows maybeValue is string here
  console.log(maybeValue.toUpperCase());
}
```
<a name="findOrThrow"></a>

### findOrThrow(arr, predicate) ⇒ <code>T</code>
Finds the first item in the array that matches the predicate, throwing an error if no match is found.

**Kind**: global function  
**Returns**: <code>T</code> - The first item that satisfies the predicate.  
**Throws**:

- <code>Error</code> If no item matches the predicate.


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;T&gt;</code> | The array to search. |
| predicate | <code>function</code> | Function to test each item. Returns true for the item to be returned. |

**Example**  
```ts
const numbers = [1, 2, 3, 4];

findOrThrow(numbers, n => n === 2); // returns 2
findOrThrow(numbers, n => n > 2); // returns 3
findOrThrow(numbers, n => n === 5); // throws Error: Item not found
```
<a name="firstOrThrow"></a>

### firstOrThrow(items) ⇒ <code>T</code>
Returns the first item in the array, throwing an error if the array is empty.

**Kind**: global function  
**Returns**: <code>T</code> - The first item in the array.  
**Throws**:

- <code>Error</code> If the array is empty.


| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;T&gt;</code> | The array to get the first item from. |

**Example**  
```ts
const items = ['a', 'b', 'c'];

firstOrThrow(items); // returns 'a'
firstOrThrow([]); // throws Error: No item found at index 0
```
<a name="indexOrThrow"></a>

### indexOrThrow(items, index) ⇒ <code>T</code>
Returns the item at the specified index in the array, throwing an error if the index is out of bounds.

**Kind**: global function  
**Returns**: <code>T</code> - The item at the specified index.  
**Throws**:

- <code>Error</code> If no item exists at the specified index.


| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;T&gt;</code> | The array to get the item from. |
| index | <code>number</code> | The index of the item to retrieve. |

**Example**  
```ts
const items = ['a', 'b', 'c'];

indexOrThrow(items, 1); // returns 'b'
indexOrThrow(items, 3); // throws Error: No item found at index 3
indexOrThrow(items, -1); // throws Error: No item found at index -1
```
<a name="makeThrottled"></a>

### makeThrottled(options, fn) ⇒ <code>function</code>
Creates a throttled version of a function that enforces a minimum delay between executions.
Multiple calls made during the delay period will share the same promise and return the same result.
After the delay period, subsequent calls will trigger a new execution.

**Kind**: global function  
**Returns**: <code>function</code> - A throttled function that returns a promise. If multiple calls are made within the delay period,
         they will all receive the same promise and result.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Configuration object. |
| options.minDelay | <code>number</code> | Minimum delay in milliseconds between function executions. |
| fn | <code>function</code> | The function to throttle. Can be synchronous or asynchronous. |

**Example**  
```ts
// Throttle an API call to at most once per second
const fetchData = () => fetch('/api/data').then(r => r.json());
const throttledFetch = makeThrottled({ minDelay: 1000 }, fetchData);

// First call executes immediately
const result1 = await throttledFetch();

// Calls within 1 second share the same promise
const promise2 = throttledFetch();
const promise3 = throttledFetch();
// promise2 === promise3

// After 1 second delay, new call triggers another execution
await sleep(1100);
const result2 = await throttledFetch(); // New execution
```
<a name="sleep"></a>

### sleep(ms) ⇒ <code>Promise.&lt;void&gt;</code>
Asynchronously pauses execution for a specified duration.
Returns a promise that resolves after the given number of milliseconds.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise that resolves after the specified delay.  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Duration in milliseconds to sleep. |

**Example**  
```ts
// Sleep for 1 second
await sleep(1000);

// Use in a loop with delays
for (let i = 0; i < 5; i++) {
  console.log(i);
  await sleep(500);
}
```
<a name="asTuple"></a>

### asTuple(arr) ⇒ <code>T</code>
Type-level function that ensures the input array is treated as a tuple type.
This is useful for preserving exact array literal types.

**Kind**: global function  
**Returns**: <code>T</code> - The same array, but with tuple type preservation.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>T</code> | The array to treat as a tuple. |

**Example**  
```ts
const tuple = asTuple([1, 2, 3]); // Type: [1, 2, 3]
const array = [1, 2, 3]; // Type: number[]
```
<a name="asyncFlatMap"></a>

### asyncFlatMap(array, mapper) ⇒ <code>Promise.&lt;Array&gt;</code>
Asynchronously maps over an array or async iterable and flattens the results.
Equivalent to calling asyncMap followed by Array.flat().
The mapping is performed sequentially to maintain order.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - A promise that resolves to a flattened array of mapped results.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;T&gt;</code> \| <code>AsyncIterable.&lt;T&gt;</code> | The array or async iterable to map over. |
| mapper | <code>function</code> | Async function that transforms each item. Receives the item and its index. |

**Example**  
```ts
const words = ['hello', 'world'];
const letters = await asyncFlatMap(words, async (word, index) => {
  await sleep(100); // Simulate async operation
  return word.split('');
});
// returns ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// Without asyncFlatMap, you'd need:
// const mapped = await asyncMap(words, mapper);
// const flattened = mapped.flat();
```
<a name="asyncMap"></a>

### asyncMap(iterator, mapper) ⇒ <code>Promise.&lt;Array.&lt;R&gt;&gt;</code>
Asynchronously maps over an array or async iterable, applying an async mapper function to each item.
The mapping is performed sequentially (not in parallel) to maintain order and avoid overwhelming resources.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;R&gt;&gt;</code> - A promise that resolves to an array of mapped results.  

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>Array.&lt;T&gt;</code> \| <code>AsyncIterable.&lt;T&gt;</code> | The array or async iterable to map over. |
| mapper | <code>function</code> | Async function that transforms each item. Receives the item and its index. |

**Example**  
```ts
// With array
const numbers = [1, 2, 3];
const doubled = await asyncMap(numbers, async (n, index) => {
  await sleep(100); // Simulate async operation
  return n * 2;
});
// returns [2, 4, 6]

// With async iterable
async function* generateNumbers() {
  yield 1; yield 2; yield 3;
}
const result = await asyncMap(generateNumbers(), async (n) => n * 2);
// returns [2, 4, 6]
```
<a name="asyncReduce"></a>

### asyncReduce(items, reducer, initialResult) ⇒ <code>Promise.&lt;Result&gt;</code>
Asynchronously reduces an array to a single value using an async reducer function.
The reduction is performed sequentially, processing one item at a time.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Result&gt;</code> - A promise that resolves to the final accumulated result.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;Item&gt;</code> | The array to reduce. |
| reducer | <code>function</code> | Async function that combines the accumulator with each item. |
| initialResult | <code>Result</code> | The initial value for the accumulator. |

**Example**  
```ts
const numbers = [1, 2, 3, 4];
const sum = await asyncReduce(
  numbers,
  async (total, num) => {
    await sleep(100); // Simulate async operation
    return total + num;
  },
  0
);
// returns 10

const words = ['hello', 'world'];
const combined = await asyncReduce(
  words,
  async (result, word) => result + ' ' + word,
  ''
);
// returns ' hello world'
```
<a name="batchArray"></a>

### batchArray(array, batchSize) ⇒ <code>Array.&lt;Array.&lt;T&gt;&gt;</code>
Splits an array into smaller arrays (batches) of a specified size.
Each batch will contain at most `batchSize` items.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;T&gt;&gt;</code> - An array of arrays, where each sub-array is a batch.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;T&gt;</code> | The array to split into batches. |
| batchSize | <code>number</code> | The maximum number of items per batch. |

**Example**  
```ts
batchArray([1, 2, 3, 4, 5], 2);
// returns [[1, 2], [3, 4], [5]]

batchArray(['a', 'b', 'c'], 3);
// returns [['a', 'b', 'c']]
```
<a name="batchArrayByWeights"></a>

### batchArrayByWeights(items, batchSize, getWeight) ⇒ <code>Array.&lt;Array.&lt;T&gt;&gt;</code>
Splits an array into smaller arrays (batches) based on weighted sizes.
Items are grouped into batches where the total weight doesn't exceed the specified batch size.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;T&gt;&gt;</code> - An array of arrays, where each sub-array is a batch with total weight ≤ batchSize.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;T&gt;</code> | The array to split into batches. |
| batchSize | <code>number</code> | The maximum total weight allowed per batch. |
| getWeight | <code>function</code> | Function to calculate the weight of each item. |

**Example**  
```ts
const items = ['a', 'bb', 'ccc', 'dddd'];
batchArrayByWeights(items, 5, item => item.length);
// returns [['a', 'bb'], ['ccc'], ['dddd']]
// Batch 1: 'a' (1) + 'bb' (2) = 3 ≤ 5
// Batch 2: 'ccc' (3) = 3 ≤ 5
// Batch 3: 'dddd' (4) = 4 ≤ 5
```
<a name="batchAsyncIterableByWeights"></a>

### batchAsyncIterableByWeights(items, batchSize, getWeight)
Asynchronously splits an async iterable into batches based on weighted sizes.
Items are grouped into batches where the total weight doesn't exceed the specified batch size.
This is an async generator that yields batches as they are formed.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>AsyncIterable.&lt;T&gt;</code> | The async iterable to split into batches. |
| batchSize | <code>number</code> | The maximum total weight allowed per batch. |
| getWeight | <code>function</code> | Function to calculate the weight of each item. |

**Example**  
```ts
async function* generateItems() {
  yield 'a'; yield 'bb'; yield 'ccc'; yield 'dddd';
}

for await (const batch of batchAsyncIterableByWeights(generateItems(), 5, item => item.length)) {
  console.log(batch);
}
// Outputs: ['a', 'bb'], ['ccc'], ['dddd']
```
<a name="groupBy"></a>

### groupBy(array, getKey, initialValue) ⇒ <code>Record.&lt;Key, Array.&lt;T&gt;&gt;</code>
Groups the elements of an array based on a key derived from each element.

**Kind**: global function  
**Returns**: <code>Record.&lt;Key, Array.&lt;T&gt;&gt;</code> - An object where each key maps to an array of elements that share that key.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;T&gt;</code> | The array to be grouped. |
| getKey | <code>function</code> | A function that derives the key from each element. |
| initialValue | <code>Record.&lt;Key, Array.&lt;T&gt;&gt;</code> | An initial value for the grouped result. |

**Example**  
```js
const data = [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'banana' },
];
const grouped = groupBy(data, item => item.category, {});
// Result:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' },
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' },
//   ],
// };
```
<a name="pluckIds"></a>

### pluckIds(items, idGetter) ⇒ <code>Array</code>
Extracts unique IDs from an array of objects using an ID getter function.
The function flattens nested arrays up to 10 levels deep, filters out null/undefined values,
and returns a deduplicated array of IDs.

**Kind**: global function  
**Returns**: <code>Array</code> - An array of unique, non-null IDs.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;T&gt;</code> | The array of objects to extract IDs from. |
| idGetter | <code>function</code> | Function that extracts the ID(s) from each item. Can return single values or nested arrays. |

**Example**  
```ts
const users = [
  { id: 1, friendIds: [2, 3] },
  { id: 2, friendIds: [1] },
  { id: 3, friendIds: [1, 2] }
];

// Extract user IDs
pluckIds(users, user => user.id);
// returns [1, 2, 3]

// Extract friend IDs (flattened and deduplicated)
pluckIds(users, user => user.friendIds);
// returns [2, 3, 1]

// Extract both user ID and friend IDs
pluckIds(users, user => [user.id, user.friendIds]);
// returns [1, 2, 3]
```
<a name="roundToDecimals"></a>

### roundToDecimals(value, decimals) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - The rounded value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to round. |
| decimals | <code>number</code> | The number of decimal places to round to. |

**Example**  
```ts
roundToDecimals(3.14159, 2); // returns 3.14
roundToDecimals(3.14159, 0); // returns 3
roundToDecimals(3.14159, 3); // returns 3.142
roundToDecimals(3.14, 5); // returns 3.14
```
<a name="stringToNumber"></a>

### stringToNumber(value) ⇒ <code>number</code>
Safely converts a string to a number with validation.
Throws an error if the string cannot be converted to a valid finite number.

**Kind**: global function  
**Returns**: <code>number</code> - The parsed number.  
**Throws**:

- <code>Error</code> When the string is empty, not a number, or represents an infinite value.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The string to convert to a number. |

**Example**  
```ts
stringToNumber('123'); // returns 123
stringToNumber('3.14'); // returns 3.14
stringToNumber('-42'); // returns -42
stringToNumber('abc'); // throws Error: Invalid number: abc
stringToNumber(''); // throws Error: Invalid number:
stringToNumber('Infinity'); // throws Error: Invalid number: Infinity
```
<a name="toSorted"></a>

### toSorted(array, getKey, order) ⇒ <code>Array.&lt;T&gt;</code>
Sorts an array by a key extracted from each item, returning a new sorted array.
The original array is not modified.

**Kind**: global function  
**Returns**: <code>Array.&lt;T&gt;</code> - A new array with the same items sorted by the specified key and order.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;T&gt;</code> | The array to sort. |
| getKey | <code>function</code> | Function to extract the sort key from each item. |
| order | <code>string</code> | Sort order, either 'asc' for ascending or 'desc' for descending. Defaults to 'asc'. |

**Example**  
```ts
const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];

// Sort by name ascending
toSorted(users, user => user.name);
// returns [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }]

// Sort by age descending
toSorted(users, user => user.age, 'desc');
// returns [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
```
<a name="createRange"></a>

### createRange(length) ⇒ <code>Array.&lt;number&gt;</code>
Creates an array of consecutive integers from 0 to length-1.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - An array of integers from 0 to length-1.  
**Throws**:

- <code>Error</code> If length is negative.


| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | The number of elements in the range. Must be non-negative. |

**Example**  
```ts
createRange(5); // returns [0, 1, 2, 3, 4]
createRange(0); // returns []
createRange(-1); // throws Error
```
<a name="createSingletonAsync"></a>

### createSingletonAsync(options) ⇒ <code>function</code>
Creates an async singleton that lazily fetches and caches a value.
The cached value is validated before each use and refreshed if invalid.
Handles concurrent calls by ensuring only one fetch happens at a time.

**Kind**: global function  
**Returns**: <code>function</code> - A function that returns the singleton value, fetching it if necessary.  
**Throws**:

- <code>Error</code> If the freshly fetched value is invalid.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Configuration object. |
| options.getValue | <code>function</code> | Function that fetches the value asynchronously. |
| options.isValid | <code>function</code> | Function that checks if the cached value is still valid. |

**Example**  
```ts
const getToken = createSingleton({
  getValue: async () => fetchAuthToken(),
  isValid: (token) => !token.isExpired
});

// First call fetches the token
const token1 = await getToken();

// Subsequent calls return cached token if valid
const token2 = await getToken(); // Same token if still valid

// Concurrent calls share the same fetch
const [token3, token4] = await Promise.all([getToken(), getToken()]);
```
<a name="createSingletonSync"></a>

### createSingletonSync(options) ⇒ <code>function</code>
Creates a synchronous singleton that lazily fetches and caches a value.
The cached value is validated before each use and refreshed if invalid.

**Kind**: global function  
**Returns**: <code>function</code> - A function that returns the singleton value, fetching it if necessary.  
**Throws**:

- <code>Error</code> If the freshly fetched value is invalid.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Configuration object. |
| options.getValue | <code>function</code> | Function that fetches the value synchronously. |
| options.isValid | <code>function</code> | Function that checks if the cached value is still valid. |

**Example**  
```ts
const getConfig = createSingletonSync({
  getValue: () => loadConfigFromFile(),
  isValid: (config) => config.version === expectedVersion
});

// First call fetches the config
const config1 = getConfig();

// Subsequent calls return cached config if valid
const config2 = getConfig(); // Same config if still valid
```
<a name="callInOrderWithErrorHandling"></a>

### callInOrderWithErrorHandling(handlers, params)
Calls all handlers in order, collecting errors and throwing them at the end.
If only one error occurs, throws that error directly.
If multiple errors occur, throws an AggregateError.

**Kind**: global function  
**Throws**:

- <code>Error</code> The single error if only one handler fails.
- <code>AggregateError</code> If multiple handlers fail.


| Param | Type | Description |
| --- | --- | --- |
| handlers | <code>Set.&lt;Handler.&lt;TParams&gt;&gt;</code> | Set of handler functions to call. |
| params | <code>TParams</code> | Parameters to pass to each handler. |

<a name="createSubject"></a>

### createSubject() ⇒ <code>Object</code>
Creates a subject (observable) for event-driven programming.
Allows subscribers to listen for events and emit events to all subscribers.
Handlers are called in order, and all handlers are executed even if some fail.

**Kind**: global function  
**Returns**: <code>Object</code> - An object with subscribe and emit methods.  
**Example**  
```ts
const subject = createSubject<string>();

// Subscribe to events
const unsubscribe = subject.subscribe(async (message) => {
  console.log('Received:', message);
});

// Emit events to all subscribers
await subject.emit('Hello, world!');

// Unsubscribe when done
unsubscribe();
```
<a name="mergeSubjects"></a>

### mergeSubjects(subjects) ⇒ <code>Object</code>
Merges multiple subjects into a single subscribable subject.
A handler subscribed to the merged subject will receive events from all source subjects.
Note: The merged subject cannot emit events, only subscribe to them.

**Kind**: global function  
**Returns**: <code>Object</code> - A merged subject with only a subscribe method (no emit).  

| Param | Type | Description |
| --- | --- | --- |
| subjects | <code>Array.&lt;Subject.&lt;THandlerParams&gt;&gt;</code> | Array of subjects to merge. |

**Example**  
```ts
const subject1 = createSubject<string>();
const subject2 = createSubject<string>();

const merged = mergeSubjects([subject1, subject2]);

// Subscribe once to receive events from both subjects
merged.subscribe((message) => {
  console.log('Received from any subject:', message);
});

await subject1.emit('From subject1');
await subject2.emit('From subject2');
// Both messages are received by the merged subscriber
```


## Development

### Scripts

- `npm test` - Run all tests
- `npm run lint` - Lint the source code
- `npm run build` - Build the library
- `npm run format` - Format code with Prettier
- `npm run docs` - Generate README documentation from JSDoc comments

### Design Principles

This repository follows these core principles:

- **Functional programming** - Pure functions without side effects
- **Immutability** - Data is never mutated
- **Composition** - Small, composable utilities
- **Modularity** - Each utility is independent
- **Single responsibility** - Each function does one thing well
- **Type safety** - Full TypeScript support with strict typing

## License

MIT
