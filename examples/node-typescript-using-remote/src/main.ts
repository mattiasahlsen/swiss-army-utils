import { isDefined } from 'swiss-army-utils/filter/isDefined';
import { createRange } from 'swiss-army-utils/misc/createRange';

console.log('🔧 Swiss Army Utils Example\n');

// Example 1: Using createRange
console.log('Example 1: createRange(5)');
const range = createRange(5);
console.log('Result:', range);
console.log('Type:', typeof range[0], '\n');

// Example 2: Using isDefined to filter an array
console.log('Example 2: Filtering array with isDefined');
const values = [1, null, 2, undefined, 3, 0, false, '', 4];
console.log('Original array:', values);
const definedValues = values.filter(isDefined);
console.log('Filtered array:', definedValues);
console.log('Count:', definedValues.length, '\n');

// Example 3: Combining both utilities
console.log('Example 3: Combining createRange and isDefined');
const sparseArray = createRange(10).map((i: number) =>
  i % 3 === 0 ? i : null
);
console.log('Sparse array:', sparseArray);
const compactArray = sparseArray.filter(isDefined);
console.log('Compact array:', compactArray);
