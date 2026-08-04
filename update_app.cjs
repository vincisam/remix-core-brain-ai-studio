const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  '<div className="h-screen flex bg-slate-950 font-mono text-slate-100 overflow-hidden">',
  '<div className="h-screen flex flex-col sm:flex-row bg-slate-950 font-mono text-slate-100 overflow-hidden">'
);

content = content.replace(
  '<div className="w-16 md:w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 shrink-0 z-10">',
  '<div className="w-full sm:w-16 md:w-20 bg-slate-900 border-t sm:border-t-0 sm:border-r border-slate-800 flex flex-row sm:flex-col items-center justify-around sm:justify-start py-2 sm:py-6 gap-2 sm:gap-6 shrink-0 z-10 overflow-x-auto sm:overflow-visible order-2 sm:order-1 scrollbar-hide">'
);

content = content.replace(
  '<div className="mb-4">',
  '<div className="mb-4 hidden sm:block">'
);

content = content.replace(
  '<div className="flex-1 flex flex-col relative w-full h-full min-w-0">',
  '<div className="flex-1 flex flex-col relative w-full h-full min-w-0 order-1 sm:order-2">'
);

fs.writeFileSync('src/App.tsx', content);
