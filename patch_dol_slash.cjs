const fs = require('fs');
let content = fs.readFileSync('src/ai/DynamicOptimizationLoop.ts', 'utf-8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');
fs.writeFileSync('src/ai/DynamicOptimizationLoop.ts', content);
