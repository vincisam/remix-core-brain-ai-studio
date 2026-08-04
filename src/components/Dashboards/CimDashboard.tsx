import React, { useState, useEffect } from 'react';
import { Radar, Globe, Activity, RefreshCcw, Search, AlertTriangle, Database, Zap, Plus, Play, Pause } from 'lucide-react';

export const CimDashboard = () => {
  const [activeTab, setActiveTab] = useState<"monitor" | "discovery" | "threats">("monitor");
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [engine12Status, setEngine12Status] = useState<"evaluating" | "synthesizing" | "active" | "dismissed">("evaluating");
  const [events, setEvents] = useState([
    { id: 1, time: '10:42:01', source: 'Engine 01', type: 'info', message: 'Indexed 4,021 new academic papers on ArXiv.' },
    { id: 2, time: '10:41:15', source: 'Global Web', type: 'alert', message: 'Detected anomaly in global network latency.' },
    { id: 3, time: '10:39:55', source: 'Engine 07', type: 'info', message: 'Market sentiment shifted for tech equities.' },
  ]);

  useEffect(() => {
    if (!isMonitoring) return;
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        source: ['Engine 01', 'Engine 05', 'Engine 07', 'Global Web'][Math.floor(Math.random() * 4)],
        type: Math.random() > 0.8 ? 'alert' : 'info',
        message: [
          'Scanned 10,000 global news endpoints.',
          'Identified new structural design patterns in web repositories.',
          'Synthesizing cross-lingual data streams.',
          'Detected emerging trend in distributed computing.'
        ][Math.floor(Math.random() * 4)],
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 10));
    }, 5000);
    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <Radar size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Continuous Intelligence Monitoring</h1>
            <p className="text-sm text-slate-400">CIM Protocol: Live data ingestion & structural engine discovery</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isMonitoring ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isMonitoring ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
            </span>
            <span className="text-sm font-medium text-slate-300">{isMonitoring ? 'Protocol Active' : 'Protocol Suspended'}</span>
          </div>
          <button 
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${isMonitoring ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
          >
            {isMonitoring ? <><Pause size={16} /> Suspend</> : <><Play size={16} /> Resume</>}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveTab("monitor")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'monitor' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Globe size={16} /> Global Event Stream</div>
        </button>
        <button
          onClick={() => setActiveTab("discovery")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'discovery' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Search size={16} /> Engine Discovery (Web)</div>
        </button>
        <button
          onClick={() => setActiveTab("threats")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'threats' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><AlertTriangle size={16} /> Threat Intelligence</div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6 min-h-0 space-y-6">
        
        {activeTab === 'monitor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full min-h-0">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                   <Activity className="text-emerald-400" /> Live Data Ingestion
                 </h3>
                 <span className="text-xs text-slate-400 flex items-center gap-1">
                   <RefreshCcw size={12} className={isMonitoring ? 'animate-spin text-emerald-500' : ''}/>
                   Syncing
                 </span>
               </div>
               
               <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 overflow-y-auto">
                 <table className="w-full text-left text-sm">
                   <thead className="sticky top-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 z-10">
                     <tr className="text-slate-400 text-xs uppercase tracking-wider">
                       <th className="p-4 font-medium w-24">Time</th>
                       <th className="p-4 font-medium w-32">Source</th>
                       <th className="p-4 font-medium">Event Payload</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800/50">
                     {events.map((evt) => (
                       <tr key={evt.id} className="hover:bg-slate-800/20 transition-colors group">
                         <td className="p-4 font-mono text-xs text-slate-500">{evt.time}</td>
                         <td className="p-4 text-xs font-medium text-slate-300">{evt.source}</td>
                         <td className="p-4">
                           <div className="flex items-center gap-2">
                             {evt.type === 'alert' && <AlertTriangle size={14} className="text-amber-400 shrink-0" />}
                             <span className={evt.type === 'alert' ? 'text-amber-300' : 'text-slate-300'}>{evt.message}</span>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="space-y-6 flex flex-col">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <Database className="text-blue-400" /> Global Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Ingestion Rate</span>
                      <span className="text-emerald-400 font-mono">1.2 TB/s</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Context DB Size</span>
                      <span className="text-blue-400 font-mono">42.5 PB</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Engine 01 (Search) Load</span>
                      <span className="text-rose-400 font-mono">89%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-rose-400 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
                <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <Zap className="text-fuchsia-400" /> Active CIM Directives
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="p-3 bg-slate-950 border border-slate-800 rounded-lg border-l-2 border-l-fuchsia-500">
                    <span className="block font-bold text-xs text-fuchsia-400 mb-1">Priority: High</span>
                    Monitor emerging AI design paradigms in decentralized ledgers.
                  </li>
                  <li className="p-3 bg-slate-950 border border-slate-800 rounded-lg border-l-2 border-l-blue-500">
                    <span className="block font-bold text-xs text-blue-400 mb-1">Priority: Medium</span>
                    Index advancements in quantum error correction.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discovery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
               <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                 <Search className="text-emerald-400" /> Web-Triggered Engine Discovery
               </h3>
               <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                 The CIM protocol actively monitors global structural patterns. If complex design requirements exceed the capacity of the current 11 engines, `core_brain` will automatically synthesize and integrate a new specialized sub-engine.
               </p>
               
               <div className="space-y-4">
                 {engine12Status !== 'dismissed' && (
                 <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-lg">
                   <div className="flex items-center justify-between mb-3">
                     <h4 className="font-bold text-emerald-400 text-sm">Potential Engine Identified</h4>
                     <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${engine12Status === 'evaluating' ? 'bg-emerald-500/20 text-emerald-300' : engine12Status === 'synthesizing' ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-blue-500/20 text-blue-300'}`}>
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
                 )}
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
               <h3 className="font-bold text-slate-200 mb-4">Current Engine Topology</h3>
               <div className="grid grid-cols-2 gap-3">
                 {[
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
                 ].map(engine => (
                   <div key={engine.id} className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded">
                     <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                     <span className="text-xs font-mono text-slate-400">E{engine.id}</span>
                     <span className="text-xs text-slate-300 truncate">{engine.name}</span>
                   </div>
                 ))}
                 <div className="flex items-center gap-2 p-2 bg-slate-950/50 border border-slate-800 border-dashed rounded opacity-60">
                   <Plus size={12} className="text-slate-500" />
                   <span className="text-xs text-slate-500">Auto-Scaling Slot</span>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-slate-200 mb-6 flex items-center gap-2">
              <AlertTriangle className="text-rose-400" /> Web-Based Threat & Bias Monitoring
            </h3>
            
            <div className="space-y-4">
               <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg flex gap-4">
                 <AlertTriangle className="text-rose-400 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-slate-200 text-sm">Adversarial Injection Pattern Detected</h4>
                   <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                     CIM detected a globally trending prompt injection technique attempting to bypass Engine 11's verification layer. Engine 10 has automatically deployed a WAF countermeasure rule to the API Gateway.
                   </p>
                   <div className="mt-3 text-[10px] text-rose-300 font-mono bg-rose-950/50 p-2 rounded">
                     Rule: block_regex_match_v2.44
                   </div>
                 </div>
               </div>

               <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg flex gap-4">
                 <Activity className="text-amber-400 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-slate-200 text-sm">Data Drift in Engine 07 (Finance)</h4>
                   <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                     Market correlations have deviated by &gt;15% from the established baseline models. CIM has requested Engine 01 to fetch current macroeconomic data to trigger a self-updating retraining loop for Engine 07.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
