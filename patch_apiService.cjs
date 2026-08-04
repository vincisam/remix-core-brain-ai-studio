const fs = require('fs');
let content = fs.readFileSync('src/services/apiService.ts', 'utf-8');

const importConfig = `import { getApiHeaders } from '../utils/apiConfig';\n`;
if (!content.includes('getApiHeaders')) {
  // Find first import or top of file
  if (content.startsWith('import')) {
    content = importConfig + content;
  } else {
    content = importConfig + "\n" + content;
  }
}

content = content.replace(/headers:\s*{\s*"Content-Type":\s*"application\/json"\s*}/g, `headers: getApiHeaders()`);

fs.writeFileSync('src/services/apiService.ts', content);
console.log("Patched apiService");
