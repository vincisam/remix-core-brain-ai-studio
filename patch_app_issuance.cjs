const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert import
if (!content.includes("ApiIssuanceDashboard")) {
    content = content.replace(
        "import { IntegrationBlueprintDashboard } from './components/Dashboards/IntegrationBlueprintDashboard';",
        "import { IntegrationBlueprintDashboard } from './components/Dashboards/IntegrationBlueprintDashboard';\nimport { ApiIssuanceDashboard } from './components/Dashboards/ApiIssuanceDashboard';"
    );
}

// Add state option
if (!content.includes(' | "issuance"')) {
    content = content.replace(
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command" | "blueprint">("blueprint");',
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command" | "blueprint" | "issuance">("issuance");'
    );
}

// Add button
if (!content.includes('setActivePanel("issuance")')) {
    content = content.replace(
        '<Workflow size={24} />\n        </button>',
        '<Workflow size={24} />\n        </button>\n        <button \n          onClick={() => setActivePanel("issuance")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "issuance" ? \'bg-rose-500/20 text-rose-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="API Issuance & Dev Portal"\n        >\n          <Key size={24} />\n        </button>'
    );
}

// Add Key import
if (!content.includes('Key')) {
    content = content.replace(
        'import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield } from \'lucide-react\';',
        'import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield, Key } from \'lucide-react\';'
    );
}

// Add to panel logic
if (!content.includes('<ApiIssuanceDashboard />')) {
    content = content.replace(
        'activePanel === "blueprint" ? <IntegrationBlueprintDashboard /> :',
        'activePanel === "issuance" ? <ApiIssuanceDashboard /> :\n         activePanel === "blueprint" ? <IntegrationBlueprintDashboard /> :'
    );
}

fs.writeFileSync('src/App.tsx', content);
