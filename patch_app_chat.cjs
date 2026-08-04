const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert import
if (!content.includes("ChatEngineDashboard")) {
    content = content.replace(
        "import { CimDashboard } from './components/Dashboards/CimDashboard';",
        "import { CimDashboard } from './components/Dashboards/CimDashboard';\nimport { ChatEngineDashboard } from './components/Dashboards/ChatEngineDashboard';"
    );
}

// Add state option
if (!content.includes(' | "chatengine"')) {
    content = content.replace(
        ' | "issuance" | "cim">("cim");',
        ' | "issuance" | "cim" | "chatengine">("chatengine");'
    );
}

// Add button
if (!content.includes('setActivePanel("chatengine")')) {
    content = content.replace(
        '<Radar size={24} />\n        </button>',
        '<Radar size={24} />\n        </button>\n        <button \n          onClick={() => setActivePanel("chatengine")}\n          className={`p-3 rounded-xl transition-colors ${activePanel === "chatengine" ? \'bg-emerald-500/20 text-emerald-400\' : \'text-slate-500 hover:text-slate-300 hover:bg-slate-800\'}`}\n          title="Realtime Synthesis Chat Engine"\n        >\n          <MessageSquare size={24} />\n        </button>'
    );
}

// Add MessageSquare import
if (!content.includes('MessageSquare')) {
    content = content.replace(
        "import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield, Key, Radar } from 'lucide-react';",
        "import { Sparkles, Terminal, Layers, SlidersHorizontal, Workflow, Rocket, Share2, LayoutDashboard, Shield, Key, Radar, MessageSquare } from 'lucide-react';"
    );
}

// Add to panel logic
if (!content.includes('<ChatEngineDashboard />')) {
    content = content.replace(
        'activePanel === "cim" ? <CimDashboard /> :',
        'activePanel === "chatengine" ? <ChatEngineDashboard /> :\n         activePanel === "cim" ? <CimDashboard /> :'
    );
}

fs.writeFileSync('src/App.tsx', content);
