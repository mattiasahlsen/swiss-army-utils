# Node TypeScript Example

This example project demonstrates how to use `swiss-army-utils` in a TypeScript Node.js project.

## Setup

This example is part of the npm workspace. To set it up:

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```

2. Build the swiss-army-utils library (if not already built):
   ```bash
   npm run build
   ```

## Running the Example

From this directory:

```bash
# Build the TypeScript code
npm run build

# Run the compiled JavaScript
npm start
```

Or from the root directory:

```bash
# Build and run
npm run build -w examples/node-typescript
npm start -w examples/node-typescript
```

## What This Example Shows

This example demonstrates importing and using functions from `swiss-army-utils`:

- **createRange**: Creates an array of consecutive integers
- **isDefined**: Type guard to filter out null/undefined values

The example imports these functions from the built JavaScript files (`dist/esm/*.js`), not from the TypeScript source files.
