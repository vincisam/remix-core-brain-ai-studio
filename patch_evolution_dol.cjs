const fs = require('fs');
const path = 'src/components/Dashboards/EvolutionDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

const replacements = [
  {
    old: `addLog(1, 'Anomaly detected: Evolution trigger initiated manually by user.', 'info');`,
    new: `addLog(1, 'Intelligence Gathering (Engine 01): Analyzing ArXiv, GitHub for Agentic RAG and dynamic routing optimizations.', 'info');`
  },
  {
    old: `addLog(2, 'Generated integration components and AST mappings.', 'success');`,
    new: `addLog(2, 'Synthesized Adaptive_Weighting_Kernel and DynamicOptimizationLoop (DOL).', 'success');`
  },
  {
    old: `const simResult = await simulatePythonExecution("import math\\nprint('Vector embedded')");`,
    new: `const simResult = await simulatePythonExecution("class DynamicRouter:\\n  def __init__(self):\\n    self.weights = {i: 1.0 for i in range(1,12)}\\nprint('Kernel Validated')");`
  },
  {
    old: `addLog(4, 'System Evolution Complete. Capability added.', 'success');`,
    new: `addLog(4, 'DOL Hot-swapped into live core_brain. Dynamic Routing Optimization active.', 'success');`
  }
];

replacements.forEach(rep => {
  content = content.replace(rep.old, rep.new);
});

fs.writeFileSync(path, content);
console.log("Patched EvolutionDashboard");
