import fs from 'node:fs';
import path from 'node:path';
import jsdoc2md from 'jsdoc-to-markdown';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function generateReadme() {
  const readmeTemplate = fs.readFileSync(
    path.join(__dirname, '../docs/README_TEMPLATE.md'),
    'utf-8'
  );

  const apiDocumentation = await jsdoc2md.render({
    files: ['./dist/esm/**/*.js'],
    'heading-depth': 3,
  });
  const readmeContent = readmeTemplate.replace(
    '{{API_DOCUMENTATION}}',
    apiDocumentation
  );

  // Write to README.md
  fs.writeFileSync('README.md', readmeContent);
  console.log('README.md generated successfully!');
}

await generateReadme();
