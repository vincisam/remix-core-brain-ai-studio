import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Code, LineChart, Stethoscope, Search, FileText, Database, Shield, Zap, Wrench, SplitSquareHorizontal, XCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

// --- Types ---
type EngineStatus = 'idle' | 'routing' | 'thinking' | 'streaming' | 'done' | 'error';

interface EngineMeta {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const ENGINES: EngineMeta[] = [
  { id: 'engine_01', name: 'Web & Real-Time', icon: Search, color: 'text-blue-400' },
  { id: 'engine_02', name: 'Reasoning & Logic', icon: Zap, color: 'text-amber-400' },
  { id: 'engine_03', name: 'Code & Systems', icon: Code, color: 'text-emerald-400' },
  { id: 'engine_04', name: 'Math & Compute', icon: Activity, color: 'text-rose-400' },
  { id: 'engine_05', name: 'Multimodal', icon: FileText, color: 'text-fuchsia-400' },
  { id: 'engine_06', name: 'Scientific & Medical', icon: Stethoscope, color: 'text-cyan-400' },
  { id: 'engine_07', name: 'Financial & Econ', icon: LineChart, color: 'text-green-400' },
  { id: 'engine_08', name: 'Language & Ling', icon: FileText, color: 'text-indigo-400' },
  { id: 'engine_09', name: 'Creative Synth', icon: Wrench, color: 'text-pink-400' },
  { id: 'engine_10', name: 'System Ops', icon: Database, color: 'text-slate-400' },
  { id: 'engine_11', name: 'Safety & Audit', icon: Shield, color: 'text-emerald-500' },
];

// --- Components ---

const EngineStatusIndicator = ({ engine, status }: { engine: EngineMeta; status: EngineStatus }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'idle': return 'text-slate-600 bg-slate-900/50';
      case 'routing': return 'text-amber-400 bg-amber-500/10 border-amber-500/50';
      case 'thinking': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/50 animate-pulse';
      case 'streaming': return 'text-blue-400 bg-blue-500/10 border-blue-500/50';
      case 'done': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/50';
      case 'error': return 'text-rose-400 bg-rose-500/10 border-rose-500/50';
      default: return 'text-slate-600';
    }
  };

  const Icon = engine.icon;

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg border border-transparent transition-all duration-300 ${getStatusColor()}`}>
      <Icon size={16} className={status === 'idle' ? 'opacity-50' : ''} />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold truncate">{engine.name}</div>
        <div className="text-[10px] uppercase tracking-wider opacity-70">{status}</div>
      </div>
      {status === 'thinking' || status === 'routing' || status === 'streaming' ? (
        <Loader2 size={12} className="animate-spin" />
      ) : status === 'done' ? (
        <CheckCircle2 size={12} />
      ) : status === 'error' ? (
        <XCircle size={12} />
      ) : null}
    </div>
  );
};

const RoutingBreadcrumb = ({ engineIds }: { engineIds: string[] }) => {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
      <span>core_brain</span>
      <ArrowRight size={12} />
      {engineIds.map((id, idx) => {
        const eng = ENGINES.find(e => e.id === id);
        return (
          <React.Fragment key={id}>
            <span className={eng?.color}>{eng?.name}</span>
            {idx < engineIds.length - 1 && <span className="text-slate-700">+</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const MultiModalCanvas = ({ activeEngines }: { activeEngines: string[] }) => {
  // Split view if multiple engines
  const isSplit = activeEngines.length > 1;

  if (activeEngines.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 backdrop-blur-md rounded-2xl border border-slate-800/50 p-8 text-center">
        <Terminal size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-light text-slate-300 mb-2">Command Center Idle</h2>
        <p className="text-sm max-w-md">Enter a query below. The Router will dynamically allocate specialized engines and configure this workspace.</p>
      </div>
    );
  }

  return (
    <div className={`flex-1 grid gap-4 ${isSplit ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {activeEngines.map(engineId => {
        const eng = ENGINES.find(e => e.id === engineId);
        
        // Mock specific UI based on engine
        const renderEngineContent = () => {
          switch (engineId) {
            case 'engine_03': // Code
              return (
                <div className="h-full flex flex-col font-mono text-xs">
                  <div className="flex bg-slate-950 p-2 border-b border-slate-800">
                    <span className="text-emerald-400">main.py</span>
                  </div>
                  <pre className="p-4 flex-1 overflow-auto text-slate-300">
                    <span className="text-pink-400">def</span> <span className="text-blue-300">optimize_routing</span>(payload):{'\n'}
                    {'  '}router = CoreRouter(){'\n'}
                    {'  '}<span className="text-slate-500"># Determines optimal path</span>{'\n'}
                    {'  '}return router.dispatch(payload)
                  </pre>
                </div>
              );
            case 'engine_07': // Finance
              return (
                <div className="h-full flex flex-col p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-2xl font-bold text-slate-200">NVDA</div>
                      <div className="text-sm text-green-400">+4.2% (Real-time)</div>
                    </div>
                    <LineChart size={32} className="text-slate-700" />
                  </div>
                  <div className="flex-1 border-b border-l border-slate-800 relative">
                    {/* Mock Chart */}
                    <svg className="w-full h-full text-green-500/50" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,50 20,40 40,45 60,20 80,30 100,5" />
                      <polyline fill="currentColor" opacity="0.2" points="0,50 20,40 40,45 60,20 80,30 100,5 100,50 0,50" />
                    </svg>
                  </div>
                </div>
              );
            case 'engine_06': // Medical
              return (
                <div className="h-full flex flex-col p-6 space-y-4">
                   <div className="p-4 bg-cyan-950/30 border border-cyan-900/50 rounded-lg">
                     <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2"><Stethoscope size={16}/> Clinical Synthesis</h4>
                     <p className="text-sm text-slate-300">Based on recent literature, the efficacy of the proposed treatment shows a 24% improvement in control groups.</p>
                   </div>
                   <div className="text-xs text-slate-500 border-t border-slate-800 pt-2">
                     Sources: PubMed ID: 345678, Journal of Cellular Medicine (2025)
                   </div>
                </div>
              );
            default:
              return (
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Executing generalized synthesis pathway for standard query resolution. Engine engaged in semantic analysis and response generation.
                  </p>
                </div>
              );
          }
        };

        return (
          <div key={engineId} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/80 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2">
                 {eng && <eng.icon size={16} className={eng.color} />}
                 <span className="font-semibold text-sm text-slate-200">{eng?.name || engineId} Workspace</span>
               </div>
               <div className="flex gap-1">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
               </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden relative group">
              <RoutingBreadcrumb engineIds={[engineId]} />
              {renderEngineContent()}
              
              {/* Glassmorphic overlay for scanning effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-32 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
            </div>
          </div>
        );
      })}
    </div>
  );
};


export const CommandCenterDashboard = () => {
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<Record<string, EngineStatus>>(
    ENGINES.reduce((acc, e) => ({ ...acc, [e.id]: 'idle' }), {})
  );
  const [activeEngines, setActiveEngines] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateDispatch = (input: string) => {
    if (!input.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setQuery("");
    setActiveEngines([]);
    setStatuses(ENGINES.reduce((acc, e) => ({ ...acc, [e.id]: 'idle' }), {}));

    // Simple heuristic for simulation
    const p = input.toLowerCase();
    let selected: string[] = [];
    
    if (p.includes("code") || p.includes("script")) selected.push("engine_03");
    if (p.includes("stock") || p.includes("finance")) selected.push("engine_07");
    if (p.includes("medical") || p.includes("health")) selected.push("engine_06");
    if (selected.length === 0) selected.push("engine_02"); // Fallback

    // Add safety audit for everything
    selected.push("engine_11");

    // Simulation Sequence
    const seq = async () => {
      // 1. Routing
      setStatuses(prev => {
        const next = { ...prev };
        selected.forEach(id => next[id] = 'routing');
        return next;
      });
      await new Promise(r => setTimeout(r, 600));

      // 2. Thinking
      setStatuses(prev => {
        const next = { ...prev };
        selected.forEach(id => next[id] = 'thinking');
        return next;
      });
      await new Promise(r => setTimeout(r, 1200));

      // 3. Streaming & rendering Workspace
      setActiveEngines(selected.filter(id => id !== 'engine_11')); // Don't show audit in main view
      setStatuses(prev => {
        const next = { ...prev };
        selected.forEach(id => next[id] = 'streaming');
        return next;
      });
      await new Promise(r => setTimeout(r, 1500));

      // 4. Done
      setStatuses(prev => {
        const next = { ...prev };
        selected.forEach(id => next[id] = 'done');
        return next;
      });
      setIsProcessing(false);
    };

    seq();
  };

  return (
    <div className="flex h-full bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Left Sidebar: Engine Pulse Component */}
      <div className="w-64 border-r border-slate-800/60 bg-slate-900/20 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800/60 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="font-bold tracking-wide text-sm">ENGINE PULSE</h2>
        </div>
        <div className="p-3 flex-1 overflow-y-auto space-y-2 scrollbar-hide">
          {ENGINES.map(engine => (
            <EngineStatusIndicator 
              key={engine.id} 
              engine={engine} 
              status={statuses[engine.id]} 
            />
          ))}
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
        
        <div className="flex-1 p-6 flex flex-col min-h-0 z-10 relative">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h1 className="text-2xl font-light">Command Center</h1>
            {activeEngines.length > 1 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">
                <SplitSquareHorizontal size={14} /> Split View Active
              </div>
            )}
          </div>

          <MultiModalCanvas activeEngines={activeEngines} />
        </div>

        {/* Command Terminal (Input) */}
        <div className="p-6 shrink-0 z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-xl opacity-20 blur transition duration-1000 group-hover:opacity-40" />
            <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl">
              <Terminal size={20} className="text-slate-400 ml-3 shrink-0" />
              <input 
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && simulateDispatch(query)}
                disabled={isProcessing}
                placeholder="Initialize dispatch... e.g. 'Write a Python script' or 'Compare NVDA vs AAPL'"
                className="w-full bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600 px-4 py-2"
              />
              <button 
                onClick={() => simulateDispatch(query)}
                disabled={isProcessing || !query.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 flex items-center gap-2"
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : 'Execute'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
