const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert import
if (!content.includes("CimDashboard")) {
    content = content.replace(
        "import { ApiIssuanceDashboard } from './components/Dashboards/ApiIssuanceDashboard';",
        "import { ApiIssuanceDashboard } from './components/Dashboards/ApiIssuanceDashboard';\nimport { CimDashboard } from './components/Dashboards/CimDashboard';"
    );
}

// Add state option
if (!content.includes(' | "cim"')) {
    content = content.replace(
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command" | "blueprint" | "issuance">("issuance");',
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops" | "command" | "blueprint" | "issuance" | "cim">("cim");'
    );
}

// Add button
if (!content.includes('setActivePanel("cim")')) {
    content = content.replace(
        '<Key size={24} />\n        </button>',
        '<Key size={24} />\n        </button>\n        <button \n          onClick={() => setActivePanel("cim")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "cim" ? \'bg-emerald-500/20 text-emerald-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="Continuous Intelligence Monitoring (CIM)"\n        >\n          <Radar size={24} />\n        </button>'
    );
}

// Add Radar import
if (!content.includes('Radar')) {
    content = content.replace(
        'import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield, Key } from \'lucide-react\';',
        'import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield, Key, Radar } from \'lucide-react\';'
    );
}

// Add to panel logic
if (!content.includes('<CimDashboard />')) {
    content = content.replace(
        'activePanel === "issuance" ? <ApiIssuanceDashboard /> :',
        'activePanel === "cim" ? <CimDashboard /> :\n         activePanel === "issuance" ? <ApiIssuanceDashboard /> :'
    );
}

fs.writeFileSync('src/App.tsx', content);
