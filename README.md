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

### Classes

<dl>
<dt><a href="#BaseError">BaseError</a> ⇐ <code>Error</code></dt>
<dd><p>Base error class that all custom errors in this library extend from.
Provides a flag to identify errors from this library.</p>
</dd>
<dt><a href="#InvalidInputError">InvalidInputError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Error class for invalid input errors.
Extends BaseError to provide a specific error type for input validation failures.</p>
</dd>
<dt><a href="#TimeoutError">TimeoutError</a> ⇐ <code>Error</code></dt>
<dd><p>Error class for timeout operations.
Automatically generates a detailed message with timing information.</p>
</dd>
</dl>

### Constants

<dl>
<dt><a href="#raise">raise</a> ⇒ <code>never</code></dt>
<dd><p>Throws an error immediately. Useful for inline error throwing in expressions.
Accepts either an Error object or a string message.</p>
</dd>
<dt><a href="#booleanAsStringSchema">booleanAsStringSchema</a> : <code>z.ZodSchema.&lt;boolean&gt;</code></dt>
<dd><p>Zod schema that parses boolean values from string representations.
Accepts &#39;true&#39; or &#39;false&#39; strings and transforms them to actual boolean values.</p>
</dd>
<dt><a href="#nonEmptyStringSchema">nonEmptyStringSchema</a> : <code>z.ZodSchema.&lt;string&gt;</code></dt>
<dd><p>Zod schema that validates strings are not empty (have at least 1 character).
Useful for required string fields in forms and APIs.</p>
</dd>
<dt><a href="#numberAsStringSchema">numberAsStringSchema</a> : <code>z.ZodSchema.&lt;number&gt;</code></dt>
<dd><p>Zod schema that parses number values from string representations.
Uses stringToNumber for validation and transformation.</p>
</dd>
</dl>

### Functions

<dl>
<dt><a href="#isDeepEqual">isDeepEqual(a, b)</a> ⇒ <code>boolean</code> | <code>void</code></dt>
<dd><p>Performs a deep equality comparison between two values.
Handles arrays, objects, dates, regular expressions, and primitive values.
Type-safe: only returns boolean when types match, otherwise returns void.</p>
</dd>
<dt><a href="#createDependencyContainer">createDependencyContainer(options)</a> ⇒ <code>DependencyContainer.&lt;SyncDependencies, AsyncDependencies&gt;</code></dt>
<dd><p>Creates a dependency injection container for managing application dependencies.
Supports both synchronous and asynchronous dependencies with lazy initialization.
Containers can be extended to add new dependencies while maintaining type safety.</p>
</dd>
<dt><a href="#getErrorMessage">getErrorMessage(error)</a> ⇒ <code>string</code></dt>
<dd><p>Extracts an error message from an unknown error value.
Handles Error objects, strings, objects, and other types gracefully.</p>
</dd>
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
<dt><a href="#filterObjectFields">filterObjectFields(object, filter)</a> ⇒ <code>Record.&lt;string, Value&gt;</code></dt>
<dd><p>Creates a new object containing only the entries that pass the filter function.
The filter function receives both the value and key for each entry.</p>
</dd>
<dt><a href="#mapObjectFields">mapObjectFields(obj, mapFn)</a> ⇒ <code>Record.&lt;string, TResult&gt;</code></dt>
<dd><p>Transforms an object by mapping over its key-value pairs.
The mapping function receives each key-value pair as a tuple and returns a new tuple.</p>
</dd>
<dt><a href="#omit">omit(obj, ...keys)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a new object by excluding specified keys from an existing object.
Returns a copy of the object without the omitted properties.</p>
</dd>
<dt><a href="#pick">pick(obj, keys)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a new object by picking specified keys from an existing object.
Only includes properties that exist in the source object.</p>
</dd>
</dl>

<a name="BaseError"></a>

### BaseError ⇐ <code>Error</code>
Base error class that all custom errors in this library extend from.
Provides a flag to identify errors from this library.

**Kind**: global class  
**Extends**: <code>Error</code>  
<a name="new_BaseError_new"></a>

#### new exports.BaseError()
**Example**  
```ts
class CustomError extends BaseError {}

const err = new CustomError('Something went wrong');
if (err.isBaseError) {
  // Handle custom error
}
```
<a name="InvalidInputError"></a>

### InvalidInputError ⇐ [<code>BaseError</code>](#BaseError)
Error class for invalid input errors.
Extends BaseError to provide a specific error type for input validation failures.

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_InvalidInputError_new"></a>

#### new exports.InvalidInputError()
**Example**  
```ts
throw new InvalidInputError('User ID must be a positive number');
```
<a name="raise"></a>

### raise ⇒ <code>never</code>
Throws an error immediately. Useful for inline error throwing in expressions.
Accepts either an Error object or a string message.

**Kind**: global constant  
**Returns**: <code>never</code> - Never returns (always throws).  
**Throws**:

- <code>Error</code> Always throws the provided error or creates a new Error from the string.


| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> \| <code>string</code> | The error to throw, either an Error object or string message. |

**Example**  
```ts
const value = someCondition ? validValue : raise('Invalid condition');

const result = data ?? raise(new Error('Data is required'));
```
<a name="booleanAsStringSchema"></a>

### booleanAsStringSchema : <code>z.ZodSchema.&lt;boolean&gt;</code>
Zod schema that parses boolean values from string representations.
Accepts 'true' or 'false' strings and transforms them to actual boolean values.

**Kind**: global constant  
**Example**  
```ts
booleanAsStringSchema.parse('true'); // returns true
booleanAsStringSchema.parse('false'); // returns false
booleanAsStringSchema.parse('yes'); // throws ZodError
```
<a name="nonEmptyStringSchema"></a>

### nonEmptyStringSchema : <code>z.ZodSchema.&lt;string&gt;</code>
Zod schema that validates strings are not empty (have at least 1 character).
Useful for required string fields in forms and APIs.

**Kind**: global constant  
**Example**  
```ts
nonEmptyStringSchema.parse('hello'); // returns 'hello'
nonEmptyStringSchema.parse(''); // throws ZodError with 'This field cannot be empty'
```
<a name="numberAsStringSchema"></a>

### numberAsStringSchema : <code>z.ZodSchema.&lt;number&gt;</code>
Zod schema that parses number values from string representations.
Uses stringToNumber for validation and transformation.

**Kind**: global constant  
**Example**  
```ts
numberAsStringSchema.parse('123'); // returns 123
numberAsStringSchema.parse('3.14'); // returns 3.14
numberAsStringSchema.parse('abc'); // throws ZodError
```
<a name="isDeepEqual"></a>

### isDeepEqual(a, b) ⇒ <code>boolean</code> \| <code>void</code>
Performs a deep equality comparison between two values.
Handles arrays, objects, dates, regular expressions, and primitive values.
Type-safe: only returns boolean when types match, otherwise returns void.

**Kind**: global function  
**Returns**: <code>boolean</code> \| <code>void</code> - True if values are deeply equal, false otherwise. Returns void if types don't match.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>T</code> | The first value to compare. |
| b | <code>U</code> | The second value to compare. |

**Example**  
```ts
isDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // returns true
isDeepEqual([1, 2, 3], [1, 2, 3]); // returns true
isDeepEqual(new Date('2024-01-01'), new Date('2024-01-01')); // returns true
isDeepEqual({ a: 1 }, { a: 2 }); // returns false
```
<a name="createDependencyContainer"></a>

### createDependencyContainer(options) ⇒ <code>DependencyContainer.&lt;SyncDependencies, AsyncDependencies&gt;</code>
Creates a dependency injection container for managing application dependencies.
Supports both synchronous and asynchronous dependencies with lazy initialization.
Containers can be extended to add new dependencies while maintaining type safety.

**Kind**: global function  
**Returns**: <code>DependencyContainer.&lt;SyncDependencies, AsyncDependencies&gt;</code> - A dependency container with extend and load capabilities.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Configuration for dependency creation. |
| options.createSyncDependencies | <code>function</code> | Optional function that creates synchronous dependencies. |
| options.createAsyncDependencies | <code>function</code> | Optional function that creates asynchronous dependencies. |

**Example**  
```ts
const container = createDependencyContainer({
  createSyncDependencies: () => ({
    config: { apiUrl: 'https://api.example.com' }
  }),
  createAsyncDependencies: async () => ({
    db: await connectToDatabase()
  })
});

const syncDeps = container.getSyncDependencies();
const allDeps = await container.loadAllDependencies();

const extended = container.extend({
  createSyncDependencies: (parent) => ({
    logger: createLogger(parent.getSyncDependencies().config)
  })
});
```
<a name="getErrorMessage"></a>

### getErrorMessage(error) ⇒ <code>string</code>
Extracts an error message from an unknown error value.
Handles Error objects, strings, objects, and other types gracefully.

**Kind**: global function  
**Returns**: <code>string</code> - A string representation of the error message.  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>unknown</code> | The error value to extract a message from. |

**Example**  
```ts
getErrorMessage(new Error('Something went wrong')); // returns 'Something went wrong'
getErrorMessage('Error string'); // returns 'Error string'
getErrorMessage({ code: 404 }); // returns '{"code":404}'
getErrorMessage(null); // returns 'An unknown error occurred'
```
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
<a name="filterObjectFields"></a>

### filterObjectFields(object, filter) ⇒ <code>Record.&lt;string, Value&gt;</code>
Creates a new object containing only the entries that pass the filter function.
The filter function receives both the value and key for each entry.

**Kind**: global function  
**Returns**: <code>Record.&lt;string, Value&gt;</code> - A new object with only the filtered entries.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Record.&lt;string, Value&gt;</code> | The object to filter. |
| filter | <code>function</code> | Function that tests each value and key. Returns true to keep the entry. |

**Example**  
```ts
const scores = { alice: 85, bob: 92, charlie: 78, diana: 95 };
const highScores = filterObjectFields(scores, (score) => score >= 90);
// returns { bob: 92, diana: 95 }

const startsWithD = filterObjectFields(scores, (_, key) => key.startsWith('d'));
// returns { diana: 95 }
```
<a name="mapObjectFields"></a>

### mapObjectFields(obj, mapFn) ⇒ <code>Record.&lt;string, TResult&gt;</code>
Transforms an object by mapping over its key-value pairs.
The mapping function receives each key-value pair as a tuple and returns a new tuple.

**Kind**: global function  
**Returns**: <code>Record.&lt;string, TResult&gt;</code> - A new object with transformed entries.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Record.&lt;string, TMapped&gt;</code> | The object to transform. |
| mapFn | <code>function</code> | Function that maps each [key, value] tuple to a new [key, value] tuple. |

**Example**  
```ts
const prices = { apple: 1, banana: 2, orange: 3 };
const doubled = mapObjectFields(prices, ([key, value]) => [key, value * 2]);
// returns { apple: 2, banana: 4, orange: 6 }

const prefixed = mapObjectFields(prices, ([key, value]) => [`fruit_${key}`, value]);
// returns { fruit_apple: 1, fruit_banana: 2, fruit_orange: 3 }
```
<a name="omit"></a>

### omit(obj, ...keys) ⇒ <code>Object</code>
Creates a new object by excluding specified keys from an existing object.
Returns a copy of the object without the omitted properties.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object without the specified keys.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The source object to omit from. |
| ...keys | <code>string</code> | Keys to omit from the object. Can be provided as separate arguments or arrays. |

**Example**  
```ts
const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = omit(user, 'password');
// returns { id: 1, name: 'John', email: 'john@example.com' }

const minimal = omit(user, 'password', 'email');
// returns { id: 1, name: 'John' }
```
<a name="pick"></a>

### pick(obj, keys) ⇒ <code>Object</code>
Creates a new object by picking specified keys from an existing object.
Only includes properties that exist in the source object.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object containing only the specified keys.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The source object to pick from. |
| keys | <code>Array</code> | Array of keys to pick from the object. |

**Example**  
```ts
const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
const userSummary = pick(user, ['id', 'name']);
// returns { id: 1, name: 'John' }
```


## Development

### Scripts

- `npm test` - Run all tests
- `npm run lint` - Lint the source code
- `npm run build` - Build the library
- `npm run format` - Format code with Prettier
- `npm run updateReadme` - Generate README documentation from JSDoc comments
- `npm run checks` - Check format, run lint, tests and build
- `npm run dev` - Format files, lint, test, build and regenerate README file

### Publish new version of npm package

- Run `npm run new-version [patch | minor | major]`
- Run `npm publish --dry-run` and verify output
- Run `npm publish`

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
