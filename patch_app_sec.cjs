const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert import
if (!content.includes("DevSecOpsDashboard")) {
    content = content.replace(
        "import { DeveloperApiDashboard } from './components/Dashboards/DeveloperApiDashboard';",
        "import { DeveloperApiDashboard } from './components/Dashboards/DeveloperApiDashboard';\nimport { DevSecOpsDashboard } from './components/Dashboards/DevSecOpsDashboard';"
    );
}

// Add state option
if (!content.includes(' | "devsecops"')) {
    content = content.replace(
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api">("api");',
        'useState<"chat" | "synthesis" | "evolution" | "studio" | "architecture" | "advancement" | "integration" | "saas" | "api" | "devsecops">("devsecops");'
    );
}

// Add button
if (!content.includes('setActivePanel("devsecops")')) {
    content = content.replace(
        '<Terminal size={24} />\n        </button>',
        '<Terminal size={24} />\n        </button>\n        <button \n          onClick={() => setActivePanel("devsecops")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "devsecops" ? \'bg-emerald-500/20 text-emerald-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="DevSecOps & Deployment"\n        >\n          <Shield size={24} />\n        </button>'
    );
}

// Add Shield import
if (!content.includes('Shield')) {
    content = content.replace(
        'import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard } from \'lucide-react\';',
        'import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield } from \'lucide-react\';'
    );
}


// Add to panel logic
if (!content.includes('<DevSecOpsDashboard />')) {
    content = content.replace(
        'activePanel === "saas" ? <SaaSDashboard /> :',
        'activePanel === "devsecops" ? <DevSecOpsDashboard /> :\n         activePanel === "saas" ? <SaaSDashboard /> :'
    );
}

fs.writeFileSync('src/App.tsx', content);
