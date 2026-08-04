const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/CimDashboard.tsx', 'utf-8');

// Add state
if (!content.includes('engine12Status')) {
    content = content.replace(
        'const [events, setEvents] = useState([',
        'const [engine12Status, setEngine12Status] = useState<"evaluating" | "synthesizing" | "active" | "dismissed">("evaluating");\n  const [events, setEvents] = useState(['
    );
}

// Update topology
if (content.includes("].map(engine => (")) {
    const topologyReplacement = `                 {[
                   {id: '01', name: 'Web & Real-Time', status: 'active'},
                   {id: '02', name: 'Deep Reasoning', status: 'active'},
                   {id: '03', name: 'Code & Systems', status: 'active'},
                   {id: '04', name: 'Math & Computation', status: 'active'},
                   {id: '05', name: 'Multimodal Vision', status: 'active'},
                   {id: '06', name: 'Scientific Base', status: 'active'},
                   {id: '07', name: 'Finance & Econ', status: 'active'},
                   {id: '08', name: 'Linguistics', status: 'active'},
                   {id: '09', name: 'Creative Synthesis', status: 'active'},
                   {id: '10', name: 'System Ops', status: 'active'},
                   {id: '11', name: 'Safety Audit', status: 'active'},
                   ...(engine12Status === 'active' ? [{id: '12', name: 'Quantum & Materials', status: 'active'}] : []),
                 ].map(engine => (`;
    content = content.replace(/                 \{\[\s*\{id: '01'[\s\S]*?\]\.map\(engine => \(/, topologyReplacement);
}

// Update potential engine UI
if (content.includes("Synthesize Engine 12")) {
    const engineUI = `{engine12Status !== 'dismissed' && (
                 <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-lg">
                   <div className="flex items-center justify-between mb-3">
                     <h4 className="font-bold text-emerald-400 text-sm">Potential Engine Identified</h4>
                     <span className={\`text-[10px] uppercase tracking-wider px-2 py-1 rounded \${engine12Status === 'evaluating' ? 'bg-emerald-500/20 text-emerald-300' : engine12Status === 'synthesizing' ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-blue-500/20 text-blue-300'}\`}>
                       {engine12Status === 'evaluating' ? 'Evaluating' : engine12Status === 'synthesizing' ? 'Synthesizing...' : 'Active'}
                     </span>
                   </div>
                   <p className="text-xs text-slate-300 mb-2"><strong>Domain:</strong> Quantum State Simulation & Materials Design</p>
                   <p className="text-xs text-slate-400 mb-4">Web signals indicate a 400% surge in user prompts requiring advanced materials physics and tensor network simulations beyond Engine 04 (Math) scope.</p>
                   
                   {engine12Status === 'evaluating' && (
                     <div className="flex gap-2">
                       <button 
                         onClick={() => {
                           setEngine12Status('synthesizing');
                           setTimeout(() => setEngine12Status('active'), 2500);
                         }}
                         className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs py-2 rounded transition-colors"
                       >
                         Synthesize Engine 12
                       </button>
                       <button 
                         onClick={() => setEngine12Status('dismissed')}
                         className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                       >
                         Dismiss
                       </button>
                     </div>
                   )}
                   {engine12Status === 'synthesizing' && (
                     <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                       <div className="bg-amber-400 h-2 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '65%' }}></div>
                     </div>
                   )}
                 </div>
               )}`;
               
    content = content.replace(/<div className="p-4 bg-slate-950 border border-emerald-500\/30 rounded-lg">[\s\S]*?dismissed'\) && \(/, engineUI); // Trying to replace correctly
}

fs.writeFileSync('src/components/Dashboards/CimDashboard.tsx', content);
