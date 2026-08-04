const fs = require('fs');

const appTsxPath = 'src/App.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

// Update imports
content = content.replace("import React, { useState } from 'react';", "import React, { useState, useRef } from 'react';");

// Insert touch handlers after useState
const touchHandlers = `  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = touchStartX.current - currentX;
    
    if (diff > 50) {
      setIsMobileMenuOpen(false);
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-500 hover:text-slate-300 hover:bg-slate-800';
    const classes: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-400',
      emerald: 'bg-emerald-500/20 text-emerald-400',
      indigo: 'bg-indigo-500/20 text-indigo-400',
      orange: 'bg-orange-500/20 text-orange-400',
      purple: 'bg-purple-500/20 text-purple-400',
      rose: 'bg-rose-500/20 text-rose-400',
      fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400',
      teal: 'bg-teal-500/20 text-teal-400',
    };
    return classes[color];
  };
  
  const getIndicatorColor = (color: string) => {
    const classes: Record<string, string> = {
      blue: 'bg-blue-500', emerald: 'bg-emerald-500', indigo: 'bg-indigo-500', 
      orange: 'bg-orange-500', purple: 'bg-purple-500', rose: 'bg-rose-500',
      fuchsia: 'bg-fuchsia-500', teal: 'bg-teal-500'
    };
    return classes[color];
  };

  const navGroups = [
    {
      name: "Core",
      items: [
        { id: "chat", title: "CORE_BRAIN Dashboard", icon: Terminal, color: "blue" },
        { id: "chatengine", title: "Realtime Synthesis Chat Engine", icon: MessageSquare, color: "emerald" },
        { id: "cim", title: "Continuous Intelligence Monitoring (CIM)", icon: Radar, color: "emerald" },
        { id: "command", title: "Command Center", icon: LayoutDashboard, color: "indigo" }
      ]
    },
    {
      name: "Integration",
      items: [
        { id: "architecture", title: "System Architecture", icon: Workflow, color: "orange" },
        { id: "blueprint", title: "Integration Blueprint", icon: Layers, color: "purple" },
        { id: "integration", title: "Architect of Integrated Intelligence", icon: Share2, color: "blue" },
        { id: "issuance", title: "API Issuance & Dev Portal", icon: Key, color: "rose" },
        { id: "api", title: "Developer API Dashboard", icon: Terminal, color: "indigo" }
      ]
    },
    {
      name: "Ops & Evolution",
      items: [
        { id: "devsecops", title: "DevSecOps & Deployment", icon: Shield, color: "emerald" },
        { id: "evolution", title: "Evolutionary Layer (CI/CD)", icon: Layers, color: "emerald" },
        { id: "advancement", title: "Evolutionary Advancement", icon: Rocket, color: "indigo" }
      ]
    },
    {
      name: "Prototyping",
      items: [
        { id: "synthesis", title: "Engine 09: Creative Synthesis", icon: Sparkles, color: "fuchsia" },
        { id: "studio", title: "Studio Layer (Tuning & Prototyping)", icon: SlidersHorizontal, color: "indigo" },
        { id: "saas", title: "SaaS Interactive Prototype", icon: LayoutDashboard, color: "teal" }
      ]
    }
  ];
`;

content = content.replace(
  '  const [activePanel, setActivePanel]',
  touchHandlers + '\n  const [activePanel, setActivePanel]'
);

const newSidebar = `      {/* Sidebar Navigation */}
      <div 
        className={\`
          fixed inset-y-0 left-0 z-40 transform md:relative md:translate-x-0
          \${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          w-24 md:w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center justify-start py-6 gap-4 shrink-0 overflow-y-auto scrollbar-hide
        \`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mb-2 hidden md:block">
          <CoreBrainLogo size="md" showText={false} showSubtitle={false} />
        </div>

        {navGroups.map((group, groupIdx) => (
          <React.Fragment key={group.name}>
            {groupIdx > 0 && <div className="w-10 md:w-8 h-px bg-slate-800 my-1 shrink-0"></div>}
            <div className="flex flex-col items-center gap-3 md:gap-2">
              {group.items.map((item) => {
                const isActive = activePanel === item.id;
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    onClick={() => { setActivePanel(item.id as any); setIsMobileMenuOpen(false); }}
                    className={\`relative flex items-center justify-center p-4 md:p-3 rounded-xl transition-colors \${getColorClasses(item.color, isActive)}\`}
                    title={item.title}
                  >
                    {isActive && (
                      <div className={\`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 md:w-1 h-8 md:h-6 rounded-r-md \${getIndicatorColor(item.color)}\`} />
                    )}
                    <Icon className="w-7 h-7 md:w-5 md:h-5" />
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Main Content Area */}`;

const startIndex = content.indexOf('{/* Sidebar Navigation */}');
const endIndex = content.indexOf('{/* Main Content Area */}');
if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newSidebar + content.substring(endIndex + '{/* Main Content Area */}'.length);
}

fs.writeFileSync(appTsxPath, content);
