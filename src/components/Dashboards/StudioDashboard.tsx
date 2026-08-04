import React, { useState } from 'react';
import { SlidersHorizontal, Play, Save, GitCompare, Zap, ShieldAlert, Cpu } from 'lucide-react';

export const StudioDashboard = () => {
  const [activeTab, setActiveTab] = useState<"pcm" | "sandbox">("sandbox");
  const [systemInstruction, setSystemInstruction] = useState("You are core_brain, the central intelligence and orchestrator.");
  const [temperature, setTemperature] = useState(0.4);
  const [topP, setTopP] = useState(0.8);
  const [maxTokens, setMaxTokens] = useState(4096);
  
  const [testQuery, setTestQuery] = useState("Explain the theory of relativity.");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const handleSimulate = async () => {
    if (!testQuery) return;
    setIsSimulating(true);
    
    // Simulate the Shadow Mode / Sandbox execution
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setSimulationResult({
      blue: {
        latency: "1.2s",
        accuracy: "92%",
        response: "The theory of relativity, developed by Albert Einstein..."
      },
      green: {
        latency: "1.1s",
        accuracy: "96%",
        response: "[Version 2.1.0-beta] The theory of relativity encompasses two interrelated theories by Albert Einstein: special relativity and general relativity..."
      },
      diff: "Green version provided a more precise introductory definition (+4% accuracy score). Latency slightly improved."
    });
    
    setIsSimulating(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
          <SlidersHorizontal size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Studio Layer (PCM & Sandbox)</h1>
          <p className="text-sm text-slate-400">Parameter Control & System Instruction Versioning</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-800 mb-6 shrink-0">
        <button 
          onClick={() => setActiveTab("sandbox")}
          className={`pb-3 px-4 font-semibold transition-colors ${activeTab === "sandbox" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
        >
          Prompt Sandbox
        </button>
        <button 
          onClick={() => setActiveTab("pcm")}
          className={`pb-3 px-4 font-semibold transition-colors ${activeTab === "pcm" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
        >
          Parameter Control Module
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-2">
        {activeTab === "sandbox" && (
          <div className="flex flex-col md:flex-row gap-6 h-full min-h-0">
            {/* Editor Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 h-full min-h-0">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col flex-1 min-h-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Cpu size={16} /> Experimental Instruction (Green)
                  </h3>
                  <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded">v2.1.0-beta</span>
                </div>
                <textarea
                  className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none text-slate-300"
                  value={systemInstruction}
                  onChange={(e) => setSystemInstruction(e.target.value)}
                />
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shrink-0">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Test Simulation</h3>
                <input 
                  type="text"
                  placeholder="Enter a test prompt..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500/50 mb-3"
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                />
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating || !testQuery}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSimulating ? <Zap size={18} className="animate-pulse" /> : <Play size={18} />}
                  {isSimulating ? "Simulating Shadow Mode..." : "Run Shadow Test"}
                </button>
              </div>
            </div>

            {/* Results Side */}
            <div className="w-full md:w-1/2 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-full min-h-0">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-4 shrink-0">
                <GitCompare size={16} /> Comparative Analysis
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {!simulationResult && !isSimulating && (
                  <div className="h-full flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-slate-800 rounded-xl">
                    Run a shadow test to compare Blue vs Green output.
                  </div>
                )}
                
                {isSimulating && (
                   <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                     <Zap size={32} className="animate-pulse text-indigo-500/50" />
                     <p className="font-mono text-sm">Engine 11 evaluating diff in virtual instance...</p>
                   </div>
                )}

                {simulationResult && !isSimulating && (
                  <>
                    <div className="bg-slate-950 border border-blue-900/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-blue-400 uppercase">Blue (Current Prod)</span>
                        <div className="flex gap-3 text-xs font-mono text-slate-500">
                          <span>Acc: {simulationResult.blue.accuracy}</span>
                          <span>Lat: {simulationResult.blue.latency}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300">{simulationResult.blue.response}</p>
                    </div>

                    <div className="bg-slate-950 border border-emerald-900/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase">Green (v2.1.0-beta)</span>
                        <div className="flex gap-3 text-xs font-mono text-slate-500">
                          <span className="text-emerald-400">Acc: {simulationResult.green.accuracy}</span>
                          <span className="text-emerald-400">Lat: {simulationResult.green.latency}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300">{simulationResult.green.response}</p>
                    </div>

                    <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl">
                      <span className="text-xs font-bold text-indigo-400 uppercase mb-2 block">Engine 11 Diff Analysis</span>
                      <p className="text-sm text-slate-300">{simulationResult.diff}</p>
                    </div>
                    
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4">
                      <Save size={18} /> Deploy to Green
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "pcm" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
              <SlidersHorizontal className="text-indigo-400" /> Dynamic Parameter Control
            </h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-300">Temperature</label>
                  <span className="text-sm font-mono text-indigo-400">{temperature.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0" max="2" step="0.05" 
                  value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <p className="text-xs text-slate-500 mt-2">Scales automatically based on intent. (e.g. Engine 09 scales up, Engine 04 scales down)</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-300">Top P</label>
                  <span className="text-sm font-mono text-indigo-400">{topP.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.05" 
                  value={topP} onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <p className="text-xs text-slate-500 mt-2">Nucleus sampling threshold.</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-300">Max Output Tokens</label>
                  <span className="text-sm font-mono text-indigo-400">{maxTokens}</span>
                </div>
                <input 
                  type="range" min="1024" max="8192" step="512" 
                  value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              
              <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl mt-8">
                <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2"><ShieldAlert size={16}/> Engine 11 Safety Injection</h4>
                <p className="text-xs text-slate-400">Current threshold set to strictly monitor code injections and prompt leakage. Adjusting these overrides requires Sandbox Verification.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
