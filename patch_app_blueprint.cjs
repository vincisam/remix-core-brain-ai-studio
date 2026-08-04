const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert import
if (!content.includes("IntegrationBlueprintDashboard")) {
    content = content.replace(
        "import { CommandCenterDashboard } from './components/Dashboards/CommandCenterDashboard';",
        "import { CommandCenterDashboard } from './components/Dashboards/CommandCenterDashboard';\nimport { IntegrationBlueprintDashboard } from './components/Dashboards/IntegrationBlueprintDashboard';"
    );
}

// Add state option
if (!content.includes(' | "blueprint"')) {
    content = content.replace(
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command">("command");',
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command" | "blueprint">("blueprint");'
    );
}

// Add button
if (!content.includes('setActivePanel("blueprint")')) {
    content = content.replace(
        '<LayoutDashboard size={24} />\n        </button>',
        '<LayoutDashboard size={24} />\n        </button>\n        <button \n          onClick={() => setActivePanel("blueprint")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "blueprint" ? \'bg-purple-500/20 text-purple-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="Integration Blueprint"\n        >\n          <Workflow size={24} />\n        </button>'
    );
}


// Add to panel logic
if (!content.includes('<IntegrationBlueprintDashboard />')) {
    content = content.replace(
        'activePanel === "command" ? <CommandCenterDashboard /> :',
        'activePanel === "blueprint" ? <IntegrationBlueprintDashboard /> :\n         activePanel === "command" ? <CommandCenterDashboard /> :'
    );
}

fs.writeFileSync('src/App.tsx', content);
