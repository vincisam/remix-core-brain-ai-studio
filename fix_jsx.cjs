const fs = require('fs');
const path = 'src/components/Dashboards/ArchitectureDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');
content = content.replace(/Einstein -> Relativity -> Physics/g, 'Einstein -&gt; Relativity -&gt; Physics');
fs.writeFileSync(path, content);
console.log("Fixed JSX syntax error");
