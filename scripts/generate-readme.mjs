import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { execSync } from 'child_process';

const distDir = './dist/esm';

function getAllJsFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') && !file.endsWith('.test.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

const files = getAllJsFiles(distDir);

// Group files by category
const categories = {
  'compare': [],
  'dependency-injection': [],
  'error': [],
  'filter': [],
  'find': [],
  'functions': [],
  'map-reduce': [],
  'misc': [],
  'object': [],
  'schemas': [],
};

files.forEach(file => {
  const relativePath = relative(distDir, file);
  const category = relativePath.split('/')[0];
  if (categories[category]) {
    categories[category].push(file);
  }
});

const categoryDescriptions = {
  'compare': 'Utilities for comparing and checking equality of values.',
  'dependency-injection': 'Tools for managing and organizing application dependencies.',
  'error': 'Error handling utilities and custom error classes.',
  'filter': 'Functions for filtering and type-guarding values.',
  'find': 'Array search utilities that throw errors when items are not found.',
  'functions': 'Higher-order function utilities.',
  'map-reduce': 'Array and async iteration utilities for mapping, reducing, and transforming data.',
  'misc': 'Miscellaneous utilities including singletons, subjects, and ranges.',
  'object': 'Object manipulation utilities.',
  'schemas': 'Zod schema definitions for common validation patterns.',
};

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

for (const [category, fileList] of Object.entries(categories)) {
  if (fileList.length === 0) continue;
  
  markdown += `### ${category}\n\n`;
  markdown += `${categoryDescriptions[category] || ''}\n\n`;
  
  for (const file of fileList) {
    try {
      const jsdocMd = execSync(`npx jsdoc2md "${file}"`, { encoding: 'utf-8' });
      if (jsdocMd.trim()) {
        markdown += jsdocMd + '\n';
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
}

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
