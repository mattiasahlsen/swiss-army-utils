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

{{API_DOCUMENTATION}}

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

- Run `npm version [patch | minor | major]`
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
