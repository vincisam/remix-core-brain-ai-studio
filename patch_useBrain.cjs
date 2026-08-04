const fs = require('fs');
let content = fs.readFileSync('src/hooks/useBrain.ts', 'utf-8');

const importConfig = `import { getApiHeaders } from '../utils/apiConfig';\nimport { useState } from 'react';`;
content = content.replace(`import { useState } from 'react';`, importConfig);

content = content.replace(`headers: { 'Content-Type': 'application/json' },`, `headers: getApiHeaders(),`);

fs.writeFileSync('src/hooks/useBrain.ts', content);
console.log("Patched useBrain");
