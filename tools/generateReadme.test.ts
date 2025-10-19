import path from 'node:path';
import { generateReadme } from './generateReadme.js';
import fs from 'node:fs';

describe('generateReadme', () => {
  it('should generate README content', async () => {
    const readmeTemplate = fs.readFileSync(
      path.join(__dirname, '../docs/README_TEMPLATE.md'),
      'utf-8'
    );

    const generatedReadmeContent = await generateReadme(readmeTemplate);
    const expectedReadmeContent = fs.readFileSync(
      path.join(__dirname, '../README.md'),
      'utf-8'
    );
    expect(generatedReadmeContent).toEqual(expectedReadmeContent);
  });
});
