const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  "import { StudioDashboard } from './components/StudioDashboard';",
  "import { StudioDashboard } from './components/StudioDashboard';\nimport { ArchitectureDashboard } from './components/ArchitectureDashboard';"
);

content = content.replace(
  "import { Cpu, Sparkles, Terminal, Layers, SlidersHorizontal } from 'lucide-react';",
  "import { Cpu, Sparkles, Terminal, Layers, SlidersHorizontal, Workflow } from 'lucide-react';"
);

content = content.replace(
  'const [activePanel, setActivePanel] = useState<"chat" | "synthesis" | "evolution" | "studio">("chat");',
  'const [activePanel, setActivePanel] = useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture">("chat");'
);

content = content.replace(
  /        <button \n          onClick=\{\(\) => setActivePanel\("evolution"\)\}/,
  '        <button \n          onClick={() => setActivePanel("architecture")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "architecture" ? \'bg-orange-500/20 text-orange-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="System Architecture"\n        >\n          <Workflow size={24} />\n        </button>\n\n        <button \n          onClick={() => setActivePanel("evolution")}'
);

content = content.replace(
  '         activePanel === "studio" ? <StudioDashboard /> :',
  '         activePanel === "studio" ? <StudioDashboard /> :\n         activePanel === "architecture" ? <ArchitectureDashboard /> :'
);

fs.writeFileSync('src/App.tsx', content);
