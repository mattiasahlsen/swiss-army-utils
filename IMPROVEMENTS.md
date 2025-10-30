# Potential Improvements for swiss-army-utils

This document outlines potential enhancements to improve code quality, performance, developer experience, and maintainability. These improvements align with the repository's core values of functional programming, immutability, composition, modularity, and the single responsibility principle.

## Table of Contents

- [Code Quality & Type Safety](#code-quality--type-safety)
- [Performance Optimizations](#performance-optimizations)
- [Testing Improvements](#testing-improvements)
- [Documentation Enhancements](#documentation-enhancements)
- [Developer Experience](#developer-experience)
- [New Utility Functions](#new-utility-functions)
- [Build & Tooling](#build--tooling)
- [API Design](#api-design)

## Code Quality & Type Safety

### 1. Stricter TypeScript Configuration
**Priority:** Medium  
**Effort:** Low

Enable additional TypeScript strict flags for better type safety:
- `noUncheckedIndexedAccess`: Prevent runtime errors from undefined array/object access
- `noPropertyAccessFromIndexSignature`: Force explicit property access patterns
- `exactOptionalPropertyTypes`: Distinguish between `undefined` and missing properties

**Impact:** Catches more potential runtime errors at compile time.

### 2. Enhanced Type Guards
**Priority:** Low  
**Effort:** Low

Create additional type guard utilities to complement `isDefined`:
- `isString(value: unknown): value is string`
- `isNumber(value: unknown): value is number`
- `isArray(value: unknown): value is unknown[]`
- `isObject(value: unknown): value is Record<string, unknown>`
- `isNonEmpty<T>(arr: T[]): arr is [T, ...T[]]` - for non-empty array validation

**Impact:** More comprehensive type narrowing capabilities.

### 3. Immutability Helpers
**Priority:** Medium  
**Effort:** Medium

Add utilities for immutable data structures:
- `freeze<T>(obj: T): Readonly<T>` - Deep freeze objects
- `deepClone<T>(obj: T): T` - Deep clone with proper handling of dates, maps, sets
- `updateIn<T>(obj: T, path: string[], updater: (value: any) => any): T` - Immutable nested updates

**Impact:** Better support for functional programming patterns.

### 4. ESLint Rule Improvements
**Priority:** Low  
**Effort:** Low

Re-enable and configure:
- `@typescript-eslint/no-explicit-any` with exceptions where truly needed
- `@typescript-eslint/no-unused-vars` with proper ignore patterns for intentional unused parameters
- Add `@typescript-eslint/explicit-function-return-type` for public APIs

**Impact:** Improved code consistency and reduced potential bugs.

## Performance Optimizations

### 1. Parallel Async Operations
**Priority:** Medium  
**Effort:** Medium

Add parallel versions of async utilities:
- `asyncMapParallel<T, R>(items: T[], mapper: (item: T) => Promise<R>, concurrency?: number): Promise<R[]>`
- `asyncFlatMapParallel<T, R>(items: T[], mapper: (item: T) => Promise<R[]>, concurrency?: number): Promise<R[]>`

**Impact:** Significant performance improvements for I/O-bound operations.

**Rationale:** Current `asyncMap` and `asyncFlatMap` are sequential. Many use cases could benefit from controlled parallelism.

### 2. Memoization Utilities
**Priority:** Medium  
**Effort:** Medium

Create memoization helpers:
- `memoize<T extends (...args: any[]) => any>(fn: T, options?: { ttl?: number, maxSize?: number }): T`
- `memoizeAsync<T extends (...args: any[]) => Promise<any>>(fn: T, options?: MemoOptions): T`

**Impact:** Reduce redundant computations in hot paths.

### 3. Optimize `groupBy` for Large Datasets
**Priority:** Low  
**Effort:** Low

Current implementation clones arrays from initialValue unnecessarily. Consider:
- Only clone when first modified
- Use a WeakMap to track which arrays have been cloned

**Impact:** Reduced memory allocation and GC pressure.

### 4. Stream-Based Utilities
**Priority:** Medium  
**Effort:** High

Add utilities for working with Node.js streams:
- `asyncIterableToStream<T>(iterable: AsyncIterable<T>): ReadableStream<T>`
- `streamToAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterable<T>`
- `transformStream<T, R>(transformer: (item: T) => R | Promise<R>): TransformStream<T, R>`

**Impact:** Better integration with Node.js ecosystem and memory-efficient processing.

## Testing Improvements

### 1. Property-Based Testing
**Priority:** Medium  
**Effort:** Medium

Integrate property-based testing (e.g., fast-check) for utilities like:
- `isDeepEqual` - test with randomly generated objects
- `groupBy` - verify grouping properties hold
- `batchArray` - ensure no data loss and correct batch sizes

**Impact:** Discover edge cases that manual tests might miss.

### 2. Performance Benchmarks
**Priority:** Low  
**Effort:** Medium

Add benchmark suite to track performance across versions:
- Use a tool like benchmark.js or tinybench
- Add CI step to detect performance regressions
- Compare against lodash/ramda equivalents where applicable

**Impact:** Prevent performance regressions and validate optimization efforts.

### 3. Test Coverage Reporting
**Priority:** Low  
**Effort:** Low

Add test coverage tracking:
- Configure Jest to generate coverage reports
- Add coverage thresholds (e.g., 90% minimum)
- Display coverage badge in README

**Impact:** Ensure comprehensive test coverage and identify untested code paths.

### 4. Integration Tests
**Priority:** Low  
**Effort:** Medium

Add integration tests that:
- Test combinations of utilities working together
- Validate the examples in the README
- Test both ESM and CJS builds

**Impact:** Catch issues in real-world usage scenarios.

## Documentation Enhancements

### 1. Usage Examples Repository
**Priority:** Medium  
**Effort:** Medium

Expand the `examples/` directory with:
- Real-world use case examples (e.g., data pipeline, API integration)
- Performance comparison examples
- Migration guides from similar libraries (lodash, ramda)

**Impact:** Easier adoption and better understanding of practical applications.

### 2. API Documentation Website
**Priority:** Medium  
**Effort:** High

Create a documentation website (e.g., using Docusaurus, VitePress):
- Interactive examples with code playground
- Search functionality
- Category-based navigation
- Changelog with migration guides

**Impact:** Professional appearance and improved discoverability.

### 3. JSDocs Enhancement
**Priority:** Low  
**Effort:** Low

Improve JSDoc comments:
- Add `@since` tags to track when utilities were added
- Add `@see` tags to reference related utilities
- Include performance characteristics where relevant (e.g., O(n) complexity)
- Add `@throws` documentation for error conditions

**Impact:** Better IDE tooltips and generated documentation.

### 4. Contributing Guide
**Priority:** Low  
**Effort:** Low

Create `CONTRIBUTING.md` with:
- How to add a new utility
- Testing requirements
- Documentation standards
- Release process

**Impact:** Easier for contributors to add high-quality utilities.

## Developer Experience

### 1. VSCode Extensions Recommendation
**Priority:** Low  
**Effort:** Low

Add `.vscode/extensions.json` recommending:
- ESLint
- Prettier
- TypeScript specific extensions
- Jest runner

**Impact:** Consistent development environment for all contributors.

### 2. Git Hooks
**Priority:** Low  
**Effort:** Low

Add husky and lint-staged to:
- Run linting on staged files
- Run tests on pre-push
- Validate commit messages

**Impact:** Catch issues before they reach CI.

### 3. Renovate/Dependabot Configuration
**Priority:** Low  
**Effort:** Low

Configure automated dependency updates with:
- Grouped updates for related packages
- Auto-merge for patch versions with passing tests
- Scheduled updates to avoid notification spam

**Impact:** Keep dependencies up-to-date with minimal manual effort.

### 4. Debug Configurations
**Priority:** Low  
**Effort:** Low

Add `.vscode/launch.json` with:
- Configuration to debug tests
- Configuration to debug build scripts
- Configuration to debug examples

**Impact:** Easier debugging experience.

## New Utility Functions

### 1. Array Utilities
**Priority:** Medium  
**Effort:** Low

Add commonly needed array operations:
- `chunk<T>(array: T[], size: number): T[][]` - Similar to batchArray but with better name
- `shuffle<T>(array: T[]): T[]` - Fisher-Yates shuffle
- `sample<T>(array: T[], count: number): T[]` - Random sampling
- `partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]]` - Split by condition
- `uniq<T>(array: T[]): T[]` - Remove duplicates (simpler than filterUnique)
- `difference<T>(a: T[], b: T[]): T[]` - Set difference
- `intersection<T>(a: T[], b: T[]): T[]` - Set intersection

**Impact:** More complete array manipulation toolkit.

### 2. String Utilities
**Priority:** Medium  
**Effort:** Low

Add string manipulation helpers:
- `capitalize(str: string): string`
- `camelCase(str: string): string`
- `kebabCase(str: string): string`
- `snakeCase(str: string): string`
- `truncate(str: string, length: number, suffix?: string): string`
- `template(str: string, data: Record<string, any>): string` - Simple template strings

**Impact:** Reduce need for external string libraries.

### 3. Function Composition Utilities
**Priority:** Medium  
**Effort:** Medium

Add functional programming helpers:
- `pipe<T>(...fns: Function[]): (input: T) => any` - Left-to-right composition
- `compose<T>(...fns: Function[]): (input: T) => any` - Right-to-left composition
- `curry<T extends Function>(fn: T): CurriedFunction<T>` - Function currying
- `partial<T extends Function>(fn: T, ...args: any[]): Function` - Partial application

**Impact:** Better support for functional programming patterns.

### 4. Retry Logic
**Priority:** Medium  
**Effort:** Medium

Add retry utilities:
- `retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>`
- `retryWithBackoff<T>(fn: () => Promise<T>, options?: BackoffOptions): Promise<T>`

Where options include: maxAttempts, delay, exponentialBackoff, shouldRetry predicate.

**Impact:** Common pattern for handling transient failures.

### 5. Validation Utilities
**Priority:** Low  
**Effort:** Low

Add common validators beyond Zod schemas:
- `isEmail(str: string): boolean`
- `isURL(str: string): boolean`
- `isUUID(str: string): boolean`
- `isIPAddress(str: string): boolean`

**Impact:** Quick validation without full Zod schemas.

### 6. Date/Time Utilities
**Priority:** Low  
**Effort:** Medium

Add date manipulation helpers:
- `addDays(date: Date, days: number): Date`
- `diffInDays(date1: Date, date2: Date): number`
- `isToday(date: Date): boolean`
- `formatDate(date: Date, format: string): string`

**Impact:** Reduce need for date libraries in simple cases.

### 7. Promise Utilities
**Priority:** Medium  
**Effort:** Low

Add promise helpers:
- `timeout<T>(promise: Promise<T>, ms: number): Promise<T>` - Add timeout to any promise
- `race<T>(promises: Promise<T>[], options?: { throwOnError?: boolean }): Promise<T>`
- `promiseAllObject<T extends Record<string, Promise<any>>>(obj: T): Promise<{ [K in keyof T]: Awaited<T[K]> }>`

**Impact:** Better async control flow.

## Build & Tooling

### 1. Bundle Size Analysis
**Priority:** Low  
**Effort:** Low

Add bundle size tracking:
- Use bundlephobia or size-limit
- Add CI check that fails if bundle size increases significantly
- Track tree-shakability

**Impact:** Ensure library stays lightweight.

### 2. Multiple Build Targets
**Priority:** Low  
**Effort:** Medium

Consider adding:
- Browser-specific builds (without Node.js dependencies)
- Minified builds for CDN usage
- Source maps for debugging

**Impact:** Better compatibility across environments.

### 3. TypeScript Declaration Maps
**Priority:** Low  
**Effort:** Low

Enable `declarationMap: true` in tsconfig to:
- Allow "Go to Definition" to jump to TypeScript source
- Better debugging experience for library consumers

**Impact:** Improved developer experience for library users.

### 4. Package Exports Configuration
**Priority:** Medium  
**Effort:** Low

Review and enhance package.json exports:
- Ensure proper conditional exports for ESM/CJS
- Add exports for each utility individually for better tree-shaking
- Consider subpath exports (e.g., `swiss-army-utils/array`, `swiss-army-utils/object`)

**Impact:** Better tree-shaking and smaller bundle sizes for consumers.

## API Design

### 1. Consistent Parameter Order
**Priority:** Low  
**Effort:** Low

Audit and standardize parameter order across utilities:
- Data parameter first (e.g., array, object)
- Options/predicates second
- Follows convention of Array methods and functional libraries

**Impact:** More predictable and easier-to-learn API.

### 2. Options Objects
**Priority:** Low  
**Effort:** Medium

For functions with 3+ parameters, consider using options objects:
- Example: `batchArray(array, { size: 10, fillLast: false })`
- Easier to extend without breaking changes
- Self-documenting code

**Impact:** More maintainable and extensible API.

### 3. Error Message Consistency
**Priority:** Low  
**Effort:** Low

Standardize error messages across utilities:
- Include context (function name, parameters)
- Clear, actionable messages
- Consider custom error types for specific domains

**Impact:** Better debugging experience.

### 4. Deprecation Strategy
**Priority:** Low  
**Effort:** Low

Establish deprecation process:
- Use `@deprecated` JSDoc tag
- Add console warnings in deprecated functions
- Document migration path
- Keep deprecated functions for at least 2 major versions

**Impact:** Smoother upgrades for library users.

## Security

### 1. Dependency Audit
**Priority:** High  
**Effort:** Low

- Set up automated security scanning (npm audit, Snyk)
- Regularly update dependencies
- Review dependency tree for unnecessary transitive dependencies

**Impact:** Reduce security vulnerabilities.

### 2. Input Validation
**Priority:** Medium  
**Effort:** Low

Add input validation to public APIs:
- Validate array/object inputs are not null/undefined
- Validate numeric parameters are within expected ranges
- Throw descriptive errors for invalid inputs

**Impact:** Better error messages and prevent crashes.

## Community & Ecosystem

### 1. GitHub Issue Templates
**Priority:** Low  
**Effort:** Low

Add issue templates for:
- Bug reports (with reproduction steps)
- Feature requests (with use cases)
- Performance issues (with benchmarks)

**Impact:** Higher quality issue reports.

### 2. GitHub Actions Workflows
**Priority:** Medium  
**Effort:** Medium

Enhance CI/CD:
- Automated releases on version tags
- Publish to npm registry automatically
- Run tests on multiple Node.js versions
- Add prettier check and auto-format on PR

**Impact:** Smoother release process.

### 3. Code of Conduct
**Priority:** Low  
**Effort:** Low

Add `CODE_OF_CONDUCT.md` to:
- Set expectations for community behavior
- Provide reporting mechanism

**Impact:** Welcoming community environment.

## Migration & Compatibility

### 1. Migration Guides
**Priority:** Low  
**Effort:** Medium

When making breaking changes:
- Document all breaking changes clearly
- Provide before/after code examples
- Offer codemods where possible

**Impact:** Easier upgrades for library users.

### 2. Version Support Policy
**Priority:** Low  
**Effort:** Low

Document:
- Which Node.js versions are supported
- How long major versions are supported
- TypeScript version compatibility

**Impact:** Clear expectations for users.

---

## Implementation Priority

### High Priority (Address First)
1. Security - Dependency audit and automated scanning
2. Performance - Parallel async operations
3. Documentation - Usage examples and API enhancements

### Medium Priority (Address Next)
1. New utility functions (most requested)
2. Testing improvements (property-based testing, coverage)
3. API documentation website
4. Package exports configuration

### Low Priority (Nice to Have)
1. Build tooling enhancements
2. Developer experience improvements
3. Community templates and guides
4. Advanced type safety features

---

**Note:** This document is a living document and should be updated as improvements are implemented or new ideas emerge. Each improvement should be evaluated based on:
- Value to users
- Maintenance burden
- Breaking change considerations
- Alignment with library philosophy
