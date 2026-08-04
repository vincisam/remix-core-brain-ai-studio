const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/DeveloperApiDashboard.tsx', 'utf-8');

const importStatement = `import { useBrain } from '../../hooks/useBrain';\nimport { ApiKeyManager } from './ApiKeyManager';`;
content = content.replace(`import { useBrain } from '../../hooks/useBrain';`, importStatement);

const keyManagerComponent = `          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 min-h-0 overflow-y-auto">`;
const newSection = `          <ApiKeyManager />\n\n          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 min-h-0 overflow-y-auto mt-6">`;

content = content.replace(keyManagerComponent, newSection);
fs.writeFileSync('src/components/Dashboards/DeveloperApiDashboard.tsx', content);
console.log("Patched DeveloperApiDashboard");
