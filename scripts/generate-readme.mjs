import { writeFileSync } from 'fs';
import jsdoc2md from 'jsdoc-to-markdown';

let markdown = `# swiss-army-utils

A collection of general-purpose TypeScript utilities for common programming tasks. This library provides type-safe, well-tested utility functions organized into logical categories.

## Installation

\`\`\`bash
npm install swiss-army-utils
\`\`\`

## Usage

Import utilities directly from their category paths:

\`\`\`typescript
import { isDefined } from 'swiss-army-utils/filter/isDefined';
import { asyncMap } from 'swiss-army-utils/map-reduce/asyncMap';
import { sleep } from 'swiss-army-utils/functions/sleep';
\`\`\`

## API Documentation

`;

const functionDocs = await jsdoc2md.render({ files: ['./dist/esm/**/*.js'] });
markdown += functionDocs;

markdown += `## Development

### Scripts

- \`npm test\` - Run all tests
- \`npm run lint\` - Lint the source code
- \`npm run build\` - Build the library
- \`npm run format\` - Format code with Prettier
- \`npm run docs\` - Generate README documentation from JSDoc comments

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
`;

// Write to README.md
writeFileSync('README.md', markdown);
console.log('README.md generated successfully!');
