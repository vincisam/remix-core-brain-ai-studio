const fs = require('fs');
let content = fs.readFileSync('src/components/SaaSDashboard.tsx', 'utf-8');

// If the sidebar is closed on mobile (w-0), we need a way to open it. 
// We should add a hamburger menu to the header.

content = content.replace(
  '<header className="h-auto min-h-[64px] bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-8 shrink-0 gap-4">',
  `<header className="h-auto min-h-[64px] bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-8 shrink-0 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isSidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="sm:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <LayoutDashboard size={20} />
              </button>
            )}
`
);

content = content.replace(
  '<div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-md w-96 max-w-[40%]">',
  '</div>\n          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-md w-full sm:w-96 max-w-full sm:max-w-[40%]">'
);

fs.writeFileSync('src/components/SaaSDashboard.tsx', content);
