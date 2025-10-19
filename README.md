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

All utility functions are documented with JSDoc comments in the source code. Below is an overview of available utilities organized by category. For detailed documentation including parameters, return types, and examples, refer to the JSDoc comments in the source files.

### Compare

Utilities for comparing and checking equality of values.

#### `isDeepEqual`

Performs deep equality comparison between two values with TypeScript type checking. Compares objects, arrays, dates, regexes, and primitive values recursively.

**Source:** `src/compare/isDeepEqual.ts`

### Dependency Injection

Tools for managing and organizing application dependencies.

#### `createDependencyContainer`

Creates a dependency injection container for managing synchronous and asynchronous dependencies. Supports container extension for modular dependency management.

#### `Dependencies` / `DependencyContainer`

TypeScript interfaces for dependency containers.

**Source:** `src/dependency-injection/dependencyContainer.ts`

### Error

Error handling utilities and custom error classes.

#### `BaseError`

Base error class with an `isBaseError` flag for error identification.

#### `InvalidInputError`

Error class for invalid input errors, extends BaseError.

#### `TimeoutError`

Error class for timeout errors with detailed timing information.

#### `getErrorMessage`

Extracts a user-friendly error message from any error value (Error objects, strings, or other values).

#### `raise`

Helper function that throws an error. Can accept an Error object or string. Useful in expression contexts.

**Source:** `src/error/*.ts`

### Filter

Functions for filtering and type-guarding values.

#### `filterUnique`

Filters an array to keep only unique items based on a key extraction function. When duplicate keys are found, the last occurrence is kept.

```typescript
const items = [
  { id: '1', name: 'a' },
  { id: '2', name: 'b' },
  { id: '1', name: 'c' }
];
filterUnique(items, (item) => item.id);
// returns [{ id: '1', name: 'c' }, { id: '2', name: 'b' }]
```

#### `isDefined`

Type guard that checks if a value is neither undefined nor null. Useful for filtering arrays and narrowing types in TypeScript.

```typescript
const values = [1, null, 2, undefined, 3];
const definedValues = values.filter(isDefined);
// returns [1, 2, 3]
```

**Source:** `src/filter/*.ts`

### Find

Array search utilities that throw errors when items are not found.

#### `findOrThrow`

Finds the first item in the array that matches the predicate, throwing an error if no match is found.

#### `firstOrThrow`

Returns the first item in the array, throwing an error if the array is empty.

#### `indexOrThrow`

Returns the item at the specified index in the array, throwing an error if the index is out of bounds.

**Source:** `src/find/*.ts`

### Functions

Higher-order function utilities.

#### `makeThrottled`

Creates a throttled version of a function that enforces a minimum delay between executions. Multiple calls made during the delay period will share the same promise and return the same result.

```typescript
const fetchData = () => fetch('/api/data').then(r => r.json());
const throttledFetch = makeThrottled({ minDelay: 1000 }, fetchData);
```

#### `sleep`

Asynchronously pauses execution for a specified duration. Returns a promise that resolves after the given number of milliseconds.

```typescript
await sleep(1000); // Sleep for 1 second
```

**Source:** `src/functions/*.ts`

### Map/Reduce

Array and async iteration utilities for mapping, reducing, and transforming data.

#### `asyncMap`

Asynchronously maps over an array or async iterable, applying an async mapper function to each item. The mapping is performed sequentially to maintain order.

#### `asyncFlatMap`

Asynchronously maps over an array or async iterable and flattens the results by one level.

#### `asyncReduce`

Asynchronously reduces an array or async iterable to a single value using an async reducer function.

#### `asTuple`

Type-level function that ensures the input array is treated as a tuple type, preserving exact array literal types.

#### `batchArray`

Splits an array into smaller arrays (batches) of a specified size.

```typescript
batchArray([1, 2, 3, 4, 5], 2);
// returns [[1, 2], [3, 4], [5]]
```

#### `batchArrayByWeights`

Splits an array into batches based on weights assigned to each item. Each batch will have a total weight not exceeding the specified threshold.

#### `batchAsyncIterableByWeights`

Similar to `batchArrayByWeights` but works with async iterables.

#### `pluckIds`

Extracts unique IDs from an array of objects using an ID getter function. Flattens nested arrays and returns deduplicated IDs.

```typescript
const users = [
  { id: 1, friendIds: [2, 3] },
  { id: 2, friendIds: [1] }
];
pluckIds(users, user => user.id);
// returns [1, 2]
```

#### `roundToDecimals`

Rounds a number to a specified number of decimal places.

```typescript
roundToDecimals(3.14159, 2); // returns 3.14
```

#### `stringToNumber`

Safely converts a string to a number with validation. Throws an error if the string cannot be converted to a valid finite number.

#### `toSorted`

Sorts an array by a key extracted from each item, returning a new sorted array. The original array is not modified.

**Source:** `src/map-reduce/*.ts`

### Misc

Miscellaneous utilities including singletons, subjects, and ranges.

#### `createRange`

Creates an array of consecutive integers from 0 to length-1.

```typescript
createRange(5); // returns [0, 1, 2, 3, 4]
```

#### `createSingleton` / `createSingletonAsync` / `createSingletonSync`

Creates a lazy, refreshable singleton accessor that caches values and validates them before each use. Supports both synchronous and asynchronous value fetching.

```typescript
const getConfig = createSingleton({
  getValue: () => loadConfigFromDisk(),
  isValid: (cfg) => cfg !== null && !cfg.isStale,
});
```

#### `createSubject`

Creates a subject (observable) for event-driven programming. Allows subscribers to listen for events and emit events to all subscribers.

```typescript
const subject = createSubject<string>();
const unsubscribe = subject.subscribe(async (message) => {
  console.log('Received:', message);
});
await subject.emit('Hello, world!');
unsubscribe();
```

#### `mergeSubjects`

Merges multiple subjects into a single subscribable subject.

**Source:** `src/misc/*.ts`

### Object

Object manipulation utilities.

#### `pick`

Creates a new object with only the specified keys from the source object.

#### `omit`

Creates a new object excluding the specified keys from the source object.

#### `filterObjectFields`

Filters object fields based on a predicate function that receives the value and key.

#### `mapObjectFields`

Maps object fields to new key-value pairs using a mapping function.

**Source:** `src/object/*.ts`

### Schemas

Zod schema definitions for common validation patterns.

#### `booleanAsStringSchema`

Zod schema that parses "true" or "false" strings into boolean values.

#### `nonEmptyStringSchema`

Zod schema that validates non-empty strings.

#### `numberAsStringSchema`

Zod schema that parses numeric strings into numbers.

**Source:** `src/schemas/*.ts`

## Development

### Scripts

- `npm test` - Run all tests
- `npm run lint` - Lint the source code
- `npm run build` - Build the library
- `npm run format` - Format code with Prettier

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
