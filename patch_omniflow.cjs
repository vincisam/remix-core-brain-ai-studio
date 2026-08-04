const fs = require('fs');
let file1 = fs.readFileSync('src/ai/OmniFlowEngine.ts', 'utf-8');
file1 = file1.replace(/gemini-2\.0-flash/g, 'gemini-3.6-flash');
fs.writeFileSync('src/ai/OmniFlowEngine.ts', file1);
console.log("Patched OmniFlowEngine with gemini-3.6-flash");
