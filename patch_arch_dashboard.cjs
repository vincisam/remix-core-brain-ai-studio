const fs = require('fs');
const path = 'src/components/Dashboards/ArchitectureDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

const target1 = `const [activeTab, setActiveTab] = useState<"memory" | "cognitive" | "agentic" | "evaluation" | "infrastructure">("memory");`;
const newTarget1 = `const [activeTab, setActiveTab] = useState<"memory" | "cognitive" | "agentic" | "evaluation" | "infrastructure" | "dol">("dol");`;

const target2 = `{ id: "evaluation", label: "Evaluation Flywheel", icon: <Activity size={18} /> },`;
const newTarget2 = `{ id: "evaluation", label: "Evaluation Flywheel", icon: <Activity size={18} /> },
    { id: "dol", label: "Dynamic Routing (DOL)", icon: <Network size={18} /> },`;

const renderTarget = `{activeTab === "memory" && (`;
const dolRender = `
        {activeTab === "dol" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-emerald-500/50 rounded-xl p-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2"><Network className="text-emerald-400"/> Dynamic Optimization Loop</h3>
              <p className="text-sm text-slate-400 mb-4">Adaptive Weighting Kernel actively balancing 11 sub-engines using Probabilistic Routing & Speculative Execution (Pre-fetching) to minimize Latency-to-First-Token (TTFT).</p>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800 text-xs">
                   <span className="text-slate-300">Engine 01 (Web) Weight</span>
                   <span className="text-emerald-400 font-mono">1.15</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800 text-xs">
                   <span className="text-slate-300">Engine 03 (Code) Weight</span>
                   <span className="text-emerald-400 font-mono">1.85</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800 text-xs">
                   <span className="text-slate-300">Engine 11 (Safety) Weight</span>
                   <span className="text-emerald-400 font-mono">1.05</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Zap className="text-fuchsia-400"/> Speculative Execution</h3>
              <p className="text-sm text-slate-400 mb-4">Context pre-fetching triggers Engine 01 while intent is being resolved by core_brain, reducing TTFT by ~40%.</p>
              
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-blue-400 mb-2">class DynamicRouter(core_brain):</div>
                <div className="pl-4">def update_weights(self, feedback_loop):</div>
                <div className="pl-8 text-slate-500"># Self-learning mechanism...</div>
                <div className="pl-8 text-emerald-500">self.engine_weights[engine_id] += 0.05</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "memory" && (`

content = content.replace(target1, newTarget1);
content = content.replace(target2, newTarget2);
content = content.replace(renderTarget, dolRender);

fs.writeFileSync(path, content);
console.log("Patched ArchitectureDashboard");
