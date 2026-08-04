const fs = require('fs');
let content = fs.readFileSync('src/components/SaaSDashboard.tsx', 'utf-8');

content = content.replace(
  '<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">',
  '<header className="h-auto min-h-[64px] bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-8 shrink-0 gap-4">'
);

content = content.replace(
  '<div className="flex items-center space-x-4 shrink-0">',
  '<div className="flex items-center space-x-2 sm:space-x-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">'
);

content = content.replace(
  '<aside className={`${isSidebarOpen ? \'w-64\' : \'w-20\'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0`}>',
  '<aside className={`${isSidebarOpen ? \'w-64\' : \'w-0 sm:w-20 overflow-hidden\'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0 absolute sm:relative z-50 h-full sm:h-auto`}>'
);

content = content.replace(
  '<main className="flex-1 flex flex-col min-w-0">',
  '<main className="flex-1 flex flex-col min-w-0 relative">\n        {isSidebarOpen && <div className="absolute inset-0 bg-slate-900/20 z-40 sm:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}'
);

fs.writeFileSync('src/components/SaaSDashboard.tsx', content);
