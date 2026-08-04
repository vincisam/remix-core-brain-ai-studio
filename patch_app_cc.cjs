const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert import
if (!content.includes("CommandCenterDashboard")) {
    content = content.replace(
        "import { DevSecOpsDashboard } from './components/Dashboards/DevSecOpsDashboard';",
        "import { DevSecOpsDashboard } from './components/Dashboards/DevSecOpsDashboard';\nimport { CommandCenterDashboard } from './components/Dashboards/CommandCenterDashboard';"
    );
}

// Add state option
if (!content.includes(' | "command"')) {
    content = content.replace(
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops">("devsecops");',
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command">("command");'
    );
}

// Add button
if (!content.includes('setActivePanel("command")')) {
    content = content.replace(
        '<Terminal size={24} />\n        </button>',
        '<Terminal size={24} />\n        </button>\n        <button \n          onClick={() => setActivePanel("command")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "command" ? \'bg-indigo-500/20 text-indigo-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="Command Center"\n        >\n          <LayoutDashboard size={24} />\n        </button>'
    );
}

// Add to panel logic
if (!content.includes('<CommandCenterDashboard />')) {
    content = content.replace(
        'activePanel === "devsecops" ? <DevSecOpsDashboard /> :',
        'activePanel === "command" ? <CommandCenterDashboard /> :\n         activePanel === "devsecops" ? <DevSecOpsDashboard /> :'
    );
}

fs.writeFileSync('src/App.tsx', content);
