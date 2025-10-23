import fs from 'node:fs';
import path from 'node:path';
import jsdoc2md from 'jsdoc-to-markdown';

interface FunctionInfo {
  name: string;
  category: string;
  description: string;
  params: Array<{ name: string; type: string; description: string }>;
  returns: string;
  example: string;
}

async function extractFunctionInfo(): Promise<FunctionInfo[]> {
  const jsdocData = await jsdoc2md.getTemplateData({
    files: ['./dist/esm/**/*.js'],
  });

  const functions: FunctionInfo[] = [];

  for (const item of jsdocData) {
    if (item.kind === 'function' && item.scope === 'global') {
      const filePath = item.meta?.path || '';
      const fileName = item.meta?.filename || '';
      // Extract category from the path (e.g., dist/esm/filter -> filter)
      const pathParts = filePath.split('/');
      const category = pathParts[pathParts.length - 1] || 'misc';

      functions.push({
        name: item.name,
        category,
        description: item.description || '',
        params: (item.params || []).map((p: any) => ({
          name: p.name,
          type: p.type?.names?.join(' | ') || 'any',
          description: p.description || '',
        })),
        returns: item.returns?.[0]?.type?.names?.join(' | ') || 'void',
        example: item.examples?.[0] || '',
      });
    }
  }

  return functions;
}

function generateFunctionCard(func: FunctionInfo): string {
  // Create example input from the example code
  let exampleInputs = '';
  if (func.example) {
    const exampleLines = func.example.split('\n');
    const callLine = exampleLines.find((line) =>
      line.trim().startsWith(func.name)
    );
    if (callLine) {
      const argsMatch = callLine.match(/\(([^)]*)\)/);
      if (argsMatch) {
        const args = argsMatch[1].split(',').map((a) => a.trim());
        exampleInputs = args.map((arg, i) => {
          if (i < func.params.length) {
            return `value="${arg.replace(/['"]/g, '')}"`;
          }
          return '';
        }).join(' ');
      }
    }
  }

  const paramsHtml = func.params
    .map((p, index) => {
      let placeholder = p.description;
      let defaultValue = '';
      
      // Try to extract example value
      if (func.example) {
        const callMatch = func.example.match(new RegExp(`${func.name}\\(([^)]*)\\)`));
        if (callMatch) {
          const args = callMatch[1].split(',').map(a => a.trim());
          if (args[index]) {
            defaultValue = args[index].replace(/['"]/g, '').replace(/\[|\]|\{|\}/g, '');
            // For arrays or objects, keep them as strings
            if (args[index].includes('[') || args[index].includes('{')) {
              defaultValue = args[index];
            }
          }
        }
      }

      return `
            <div class="param">
                <label>${p.name} <span class="type">(${p.type})</span>:</label>
                <input type="text" id="${func.name}-${p.name}" placeholder="${placeholder}" value="${defaultValue}">
            </div>`;
    })
    .join('');

  return `
            <!-- ${func.name} -->
            <div class="function-card">
                <h3>${func.name}</h3>
                <p class="category">${func.category}</p>
                <p>${func.description}</p>
                ${paramsHtml}
                <button onclick="test_${func.name}()">Test ${func.name}</button>
                <div id="${func.name}-output" class="output"></div>
            </div>`;
}

function generateTestFunction(func: FunctionInfo): string {
  // Only generate test functions for simple functions
  // Skip functions with complex parameters like functions, objects with nested properties, etc.
  const hasComplexParams = func.params.some(p => 
    p.name.includes('.') || // nested property like options.getValue
    (p.type.includes('function') && !p.type.includes('|')) || // pure function type
    p.type.includes('AsyncIterable') ||
    p.type.includes('Set<')
  );

  if (hasComplexParams) {
    return `
        function test_${func.name}() {
            displayOutput('${func.name}-output', 
                'This function requires complex parameters. Please see the documentation and examples above.', false);
        }`;
  }

  // Generate smart parameter parsing based on type
  const paramsGet = func.params
    .map((p) => {
      const rawValue = `document.getElementById('${func.name}-${p.name}').value`;
      // Try to intelligently parse based on type
      if (p.type.includes('number')) {
        return `const ${p.name} = parseFloat(${rawValue});`;
      } else if (p.type.includes('Array') || p.type.includes('[]')) {
        return `const ${p.name} = JSON.parse(${rawValue});`;
      } else if (p.type.includes('Object') || p.type.includes('Record')) {
        return `const ${p.name} = JSON.parse(${rawValue});`;
      } else if (p.type.includes('function')) {
        return `const ${p.name} = eval('(' + ${rawValue} + ')');`;
      } else {
        return `const ${p.name} = ${rawValue};`;
      }
    })
    .join('\n                ');

  const paramsCall = func.params.map((p) => p.name).join(', ');

  return `
        function test_${func.name}() {
            try {
                ${paramsGet}
                const result = ${func.name}(${paramsCall});
                if (result && typeof result.then === 'function') {
                    result.then(r => {
                        displayOutput('${func.name}-output', 
                            \`Input: \${JSON.stringify({ ${func.params.map((p) => p.name).join(', ')} })}\\nOutput: \${JSON.stringify(r)}\`);
                    }).catch(e => {
                        displayOutput('${func.name}-output', \`Error: \${e.message}\`, true);
                    });
                } else {
                    displayOutput('${func.name}-output', 
                        \`Input: \${JSON.stringify({ ${func.params.map((p) => p.name).join(', ')} })}\\nOutput: \${JSON.stringify(result)}\`);
                }
            } catch (e) {
                displayOutput('${func.name}-output', \`Error: \${e.message}\`, true);
            }
        }`;
}

async function generateGithubPages() {
  const functions = await extractFunctionInfo();

  console.log(`Found ${functions.length} functions to document`);

  const functionCards = functions.map(generateFunctionCard).join('\n');
  const testFunctions = functions.map(generateTestFunction).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swiss Army Utils - Interactive Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
        }

        h1 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 2.5rem;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }

        .function-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .function-card {
            border: 2px solid #e1e8ed;
            border-radius: 8px;
            padding: 20px;
            background: #f9fafb;
            transition: all 0.3s ease;
        }

        .function-card:hover {
            border-color: #667eea;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .function-card h3 {
            color: #667eea;
            margin-bottom: 5px;
            font-size: 1.3rem;
        }

        .category {
            color: #999;
            font-size: 0.8rem;
            margin-bottom: 10px;
            font-style: italic;
        }

        .function-card p {
            color: #666;
            margin-bottom: 15px;
            font-size: 0.9rem;
        }

        .param {
            margin-bottom: 10px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #555;
            font-size: 0.9rem;
        }

        .type {
            font-weight: normal;
            color: #888;
            font-size: 0.85rem;
        }

        input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 0.9rem;
            font-family: 'Courier New', monospace;
            transition: border-color 0.3s ease;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }

        button {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            transition: background 0.3s ease;
            width: 100%;
            margin-top: 10px;
        }

        button:hover {
            background: #5568d3;
        }

        button:active {
            transform: scale(0.98);
        }

        .output {
            margin-top: 15px;
            padding: 12px;
            background: #f0f4f8;
            border-left: 4px solid #667eea;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            white-space: pre-wrap;
            word-break: break-all;
            min-height: 40px;
        }

        .output.error {
            background: #fee;
            border-left-color: #e53e3e;
            color: #c53030;
        }

        .output.success {
            background: #e6fffa;
            border-left-color: #38b2ac;
            color: #234e52;
        }

        .github-link {
            display: inline-block;
            margin-top: 20px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }

        .github-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛠️ Swiss Army Utils</h1>
        <p class="subtitle">Interactive playground for TypeScript utility functions</p>
        <p>Experiment with ${functions.length} utility functions below. Enter your input and see the results instantly!</p>
        <a href="https://github.com/mattiasahlsen/swiss-army-utils" class="github-link" target="_blank">
            View on GitHub →
        </a>

        <div class="function-grid">
${functionCards}
        </div>
    </div>

    <script>
        // Utility function implementations (embedded from source)
        ${functions.map((f) => {
          // Read the built JS file to get the implementation
          try {
            const jsPath = './dist/esm/' + f.category + '/' + f.name + '.js';
            if (fs.existsSync(jsPath)) {
              let code = fs.readFileSync(jsPath, 'utf-8');
              // Remove export statement and imports
              code = code.replace(/^export\s+/gm, '');
              code = code.replace(/^import\s+.+?;?\n/gm, '');
              return '// ' + f.name + '\n        ' + code;
            }
          } catch (e) {
            console.error('Failed to read ' + f.name + ': ' + e);
          }
          return '// ' + f.name + ' - source not found';
        }).join('\n\n        ')}

        function displayOutput(elementId, content, isError = false) {
            const element = document.getElementById(elementId);
            element.textContent = content;
            element.className = 'output ' + (isError ? 'error' : 'success');
        }

        // Test functions
${testFunctions}
    </script>
</body>
</html>`;

  fs.writeFileSync('docs/index.html', html);
  console.log('GitHub Pages site generated successfully!');
}

await generateGithubPages();
