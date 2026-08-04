const fs = require('fs');

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf-8');

const sidebarStart = content.indexOf('<div className="w-full sm:w-16 md:w-20 bg-slate-900 border-t sm:border-t-0 sm:border-r border-slate-800 flex flex-row sm:flex-col items-center justify-around sm:justify-start py-2 sm:py-6 gap-2 sm:gap-6 shrink-0 z-10 overflow-x-auto sm:overflow-visible order-2 sm:order-1 scrollbar-hide">');
const sidebarEnd = content.indexOf('</div>', content.indexOf('<button \n          onClick={() => setActivePanel("evolution")}', sidebarStart)) + 6;

if (sidebarStart === -1 || sidebarEnd === -1) {
    console.error("Could not find sidebar boundaries");
    process.exit(1);
}

const newSidebar = `<div className="w-full sm:w-16 md:w-20 bg-slate-900 border-t sm:border-t-0 sm:border-r border-slate-800 flex flex-row sm:flex-col items-center justify-start py-2 sm:py-6 gap-2 sm:gap-4 shrink-0 z-10 overflow-x-auto sm:overflow-y-auto order-2 sm:order-1 scrollbar-hide">
        <div className="mb-2 hidden sm:block">
          <CoreBrainLogo size="md" showText={false} showSubtitle={false} />
        </div>
        
        {/* Core */}
        <div className="flex flex-row sm:flex-col items-center gap-2">
          <button 
            onClick={() => setActivePanel("chat")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "chat" ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="CORE_BRAIN Dashboard"
          >
            <Terminal size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("chatengine")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "chatengine" ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Realtime Synthesis Chat Engine"
          >
            <MessageSquare size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("cim")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "cim" ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Continuous Intelligence Monitoring (CIM)"
          >
            <Radar size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("command")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "command" ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Command Center"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>

        <div className="hidden sm:block w-8 h-px bg-slate-800 my-1 shrink-0"></div>
        <div className="sm:hidden w-px h-8 bg-slate-800 mx-1 shrink-0"></div>

        {/* Integration */}
        <div className="flex flex-row sm:flex-col items-center gap-2">
          <button 
            onClick={() => setActivePanel("architecture")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "architecture" ? 'bg-orange-500/20 text-orange-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="System Architecture"
          >
            <Workflow size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("blueprint")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "blueprint" ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Integration Blueprint"
          >
            <Layers size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("integration")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "integration" ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Architect of Integrated Intelligence"
          >
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("issuance")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "issuance" ? 'bg-rose-500/20 text-rose-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="API Issuance & Dev Portal"
          >
            <Key size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("api")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "api" ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Developer API Dashboard"
          >
            <Terminal size={20} />
          </button>
        </div>

        <div className="hidden sm:block w-8 h-px bg-slate-800 my-1 shrink-0"></div>
        <div className="sm:hidden w-px h-8 bg-slate-800 mx-1 shrink-0"></div>

        {/* Ops & Evolution */}
        <div className="flex flex-row sm:flex-col items-center gap-2">
          <button 
            onClick={() => setActivePanel("devsecops")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "devsecops" ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="DevSecOps & Deployment"
          >
            <Shield size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("evolution")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "evolution" ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Evolutionary Layer (CI/CD)"
          >
            <Layers size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("advancement")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "advancement" ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Evolutionary Advancement"
          >
            <Rocket size={20} />
          </button>
        </div>

        <div className="hidden sm:block w-8 h-px bg-slate-800 my-1 shrink-0"></div>
        <div className="sm:hidden w-px h-8 bg-slate-800 mx-1 shrink-0"></div>

        {/* Prototyping */}
        <div className="flex flex-row sm:flex-col items-center gap-2">
          <button 
            onClick={() => setActivePanel("synthesis")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "synthesis" ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Engine 09: Creative Synthesis"
          >
            <Sparkles size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("studio")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "studio" ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="Studio Layer (Tuning & Prototyping)"
          >
            <SlidersHorizontal size={20} />
          </button>
          <button 
            onClick={() => setActivePanel("saas")}
            className={\`p-3 rounded-xl transition-colors \${activePanel === "saas" ? 'bg-teal-500/20 text-teal-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}\`}
            title="SaaS Interactive Prototype"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>
      </div>`;

content = content.slice(0, sidebarStart) + newSidebar + content.slice(sidebarEnd);
fs.writeFileSync(file, content);
