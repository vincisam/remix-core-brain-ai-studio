const fs = require('fs');
let file1 = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');
file1 = file1.replace(/gemini-3\.1-pro-preview/g, 'gemini-3.6-flash');
fs.writeFileSync('src/ai/MoERouter.ts', file1);

let file2 = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');
file2 = file2.replace(/gemini-3\.1-pro-preview/g, 'gemini-3.6-flash');
fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', file2);

let file3 = fs.readFileSync('src/components/Chat/ChatInterface.tsx', 'utf-8');
file3 = file3.replace(/gemini-3\.1-pro-preview/g, 'gemini-3.6-flash');
fs.writeFileSync('src/components/Chat/ChatInterface.tsx', file3);

console.log("Patched other files with gemini-3.6-flash");
