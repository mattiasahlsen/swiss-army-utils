import fs from 'node:fs';
import { generateReadme } from '../tools/generateReadme.js';
import path from 'node:path';

async function updateReadme() {
  const readmeTemplate = fs.readFileSync(
    path.join(import.meta.dirname, '../docs/README_TEMPLATE.md'),
    'utf-8'
  );
  const readmeContent = await generateReadme(readmeTemplate);

  // Write to README.md
  fs.writeFileSync('README.md', readmeContent);
  console.log('README.md generated successfully!');
}

await updateReadme();
