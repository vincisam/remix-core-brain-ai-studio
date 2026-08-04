import React, { useState } from 'react';
import { Terminal, Code, Cpu, Database, Network, Loader2 } from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';
import { ApiKeyManager } from './ApiKeyManager';

export const DeveloperApiDashboard = () => {
  const [prompt, setPrompt] = useState("");
  const { mutate, data, isLoading, error } = useBrain();

  const handleTestApi = () => {
    if (prompt.trim()) {
      mutate(prompt);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
          <Code size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Developer API</h1>
          <p className="text-sm text-slate-400">Router-Worker Service Dashboard</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 min-h-0">
        
        {/* Left Column: Documentation & Console */}
        <div className="flex flex-col gap-6 h-full min-h-0">
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col shrink-0">
             <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                <Terminal size={16} className="text-emerald-400" />
                <h3 className="font-bold text-slate-300">API Console Simulator</h3>
             </div>
             <div className="p-4">
                <p className="text-xs text-slate-400 mb-3">POST /api/v1/brain/dispatch</p>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 resize-none h-32 mb-4"
                  placeholder="Enter a prompt to test the Router-Worker pipeline... e.g. 'Write a python script and show an image'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  onClick={handleTestApi}
                  disabled={isLoading || !prompt.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Network size={16} />}
                  {isLoading ? "Routing to Engines..." : "Dispatch Request"}
                </button>
             </div>
          </div>

          <ApiKeyManager />

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 min-h-0 overflow-y-auto mt-6">
             <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
               <Database size={16} className="text-blue-400" /> Architecture Overview
             </h3>
             <div className="space-y-4 text-sm text-slate-400">
               <p>
                 <strong className="text-slate-200">The Router (Core Brain):</strong> Analyzes intents using Gemini and delegates tasks to specialized engines.
               </p>
               <p>
                 <strong className="text-slate-200">The Dispatcher:</strong> Executes engine nodes asynchronously and aggregates multi-modal outputs.
               </p>
               <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                 <h4 className="text-slate-300 font-bold mb-2">Engines Available:</h4>
                 <ul className="list-disc pl-4 space-y-1 text-xs">
                   <li><span className="text-blue-400 font-mono">engine_01:</span> Web Search & Real-time</li>
                   <li><span className="text-emerald-400 font-mono">engine_03:</span> Code & Systems</li>
                   <li><span className="text-fuchsia-400 font-mono">engine_05:</span> Multimodal</li>
                   <li><span className="text-rose-400 font-mono">engine_09:</span> Creative Writing</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: API Response */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full min-h-0 relative">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2 shrink-0">
             <Cpu size={16} className="text-fuchsia-400" />
             <h3 className="font-bold text-slate-300">Unified Response Payload</h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm">
             {isLoading ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                 <Loader2 size={32} className="animate-spin text-indigo-500/50" />
                 <p>Constructing unified output...</p>
               </div>
             ) : error ? (
               <div className="text-rose-400 p-4 bg-rose-500/10 rounded-lg border border-rose-500/30">
                 Error: {error}
               </div>
             ) : data ? (
               <div className="space-y-4">
                 <pre className="text-emerald-300 whitespace-pre-wrap break-words">
{JSON.stringify(data, null, 2)}
                 </pre>

                 {/* Visual parsing of the response */}
                 <div className="mt-8 pt-6 border-t border-slate-800">
                    <h4 className="font-bold text-slate-300 mb-4 uppercase tracking-wider text-xs">Rendered Output</h4>
                    <div className="space-y-4">
                      {data.responses && data.responses.map((res: any, idx: number) => (
                         <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                           <div className="text-xs font-bold text-indigo-400 mb-2 border-b border-slate-800 pb-2">
                             Engine: {res.engine} | Type: {res.type}
                           </div>
                           {res.type === 'code' ? (
                             <pre className="text-slate-300 text-xs overflow-x-auto">{res.data}</pre>
                           ) : res.type === 'image' ? (
                             <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-700 rounded bg-slate-900">
                               <p className="text-slate-500 text-xs italic">[Image Output Blocked by Policy]</p>
                               <p className="text-slate-400 mt-2">{res.data}</p>
                             </div>
                           ) : (
                             <p className="text-slate-300">{res.data}</p>
                           )}
                         </div>
                      ))}
                    </div>
                 </div>
               </div>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-600 italic">
                 Awaiting API request...
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};
