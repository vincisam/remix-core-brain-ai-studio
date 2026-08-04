const fs = require('fs');
const path = 'src/components/Dashboards/ChatEngineDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

const oldStr = `<span className="font-bold text-fuchsia-400">Synthesizing:</span> New predictive routing engine based on observed latency patterns across platforms.`;
const newStr = `<span className="font-bold text-emerald-400">DOL ACTIVE:</span> Adaptive Weighting Kernel initialized across 11 engines. Probabilistic Routing & Speculative Execution online.`;

content = content.replace(oldStr, newStr);

// Change border color to emerald
content = content.replace('border-fuchsia-500/50', 'border-emerald-500/50');
content = content.replace('text-fuchsia-400 shrink-0', 'text-emerald-400 shrink-0');

fs.writeFileSync(path, content);
