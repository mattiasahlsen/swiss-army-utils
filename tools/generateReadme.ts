import jsdoc2md from 'jsdoc-to-markdown';

export async function generateReadme(readmeTemplate: string) {
  const apiDocumentation = await jsdoc2md.render({
    files: ['./dist/esm/**/*.js'],
    'heading-depth': 3,
  });
  const readmeContent = readmeTemplate.replace(
    '{{API_DOCUMENTATION}}',
    apiDocumentation
  );

  return readmeContent;
}
