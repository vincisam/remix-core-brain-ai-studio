import React, { useState } from 'react';
import { Share2, Code2, Database, ShieldAlert, Cpu, Network, CheckCircle2, Copy } from 'lucide-react';

export const IntegrationBlueprintDashboard = () => {
  const [activeTab, setActiveTab] = useState<"protocol" | "schema" | "state" | "deployment" | "failures">("protocol");

  const schemaJson = `{
  "correlation_id": "req_8f72c91b",
  "status": "processing",
  "router_intent": "multi_domain_synthesis",
  "engines_triggered": ["engine_03", "engine_07", "engine_11"],
  "results": {
    "engine_03": {
      "status": "streaming",
      "partial_data": "def optimize_portfolio():\\n"
    },
    "engine_07": {
      "status": "done",
      "data": {
        "ticker": "NVDA",
        "trend": "bullish",
        "confidence": 0.92
      }
    },
    "engine_11": {
      "status": "thinking",
      "audit_flags": []
    }
  }
}`;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
          <Network size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Integration Blueprint</h1>
          <p className="text-sm text-slate-400">Technical Architecture: Protocols, State, & Failures</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveTab("protocol")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'protocol' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Protocol & Comm
        </button>
        <button
          onClick={() => setActiveTab("schema")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'schema' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          API Schema
        </button>
        <button
          onClick={() => setActiveTab("state")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'state' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          State Management
        </button>
        <button
          onClick={() => setActiveTab("deployment")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'deployment' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Deployment Flow
        </button>
        <button
          onClick={() => setActiveTab("failures")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'failures' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Failure Modes
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6 min-h-0 space-y-6">
        
        {activeTab === 'protocol' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2"><Share2 className="text-blue-400"/> Communication Protocol</h3>
                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p><strong className="text-indigo-400">Recommendation: Server-Sent Events (SSE)</strong> combined with standard REST for dispatch.</p>
                  <p><strong>Why SSE over WebSockets?</strong> Since the core_brain architecture primarily involves the client sending a request and receiving a prolonged, multiplexed stream of text/json updates (not high-frequency bi-directional gaming data), SSE is vastly superior. It runs over standard HTTP/2 (multiplexing natively), avoids WebSocket proxy configuration nightmares, and has built-in browser reconnection.</p>
                  
                  <div className="p-4 bg-slate-950 rounded border border-slate-800 mt-4">
                    <h4 className="font-bold text-slate-200 mb-2">Reconnect & Backoff Strategy</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                      <li>Browser native EventSource handles automatic reconnects.</li>
                      <li>Backend uses <code className="text-emerald-400">Last-Event-ID</code> header to resume streams exactly where they dropped.</li>
                      <li>Exponential backoff (1s, 2s, 4s, max 10s) on socket drops.</li>
                    </ul>
                  </div>
                </div>
             </div>
             
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                <Network size={64} className="text-slate-700 mb-6" />
                <h4 className="font-bold text-slate-300 mb-2">Multiplexed Streams</h4>
                <p className="text-sm text-slate-500 max-w-sm">A single SSE connection streams JSON payloads containing partial updates for multiple engines simultaneously, allowing the UI to render concurrent progress.</p>
             </div>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="flex flex-col h-full">
            <div className="bg-slate-900 border border-slate-800 rounded-xl flex-1 flex flex-col min-h-0">
               <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2"><Code2 className="text-emerald-400"/> Routing Response Schema (JSON)</h3>
                 <button onClick={() => navigator.clipboard.writeText(schemaJson)} className="text-slate-400 hover:text-slate-200"><Copy size={16}/></button>
               </div>
               <div className="p-4 bg-slate-950 flex-1 overflow-auto">
                 <pre className="text-sm text-emerald-300 font-mono leading-relaxed">
                   {schemaJson}
                 </pre>
               </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 pl-2 border-l-2 border-indigo-500">
              * Note: The router issues a top-level correlation_id. The UI uses this to subscribe to the SSE endpoint to receive these state snapshots iteratively.
            </p>
          </div>
        )}

        {activeTab === 'state' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2"><Database className="text-purple-400"/> State Management</h3>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>Managing 11 concurrent streaming engines requires decoupling network lifecycle from UI cross-component state.</p>
                <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
                  <div>
                    <h4 className="font-bold text-indigo-400">1. TanStack Query (Network)</h4>
                    <p className="text-xs text-slate-400">Handles the initial dispatch POST request lifecycle (loading, error, success).</p>
                  </div>
                  <hr className="border-slate-800"/>
                  <div>
                    <h4 className="font-bold text-emerald-400">2. Zustand (Cross-Engine UI State)</h4>
                    <p className="text-xs text-slate-400">A lightweight global store holds a normalized map of engine states keyed by engine ID. Components (like the MultiModalCanvas) subscribe to specific engine IDs to prevent full-app re-renders.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
               <h4 className="font-bold text-slate-200 mb-4">Handling Race Conditions</h4>
               <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                   <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                   <div>
                     <strong className="block text-slate-200">Out-of-Order Resolutions</strong>
                     <span className="text-slate-400">Because state is keyed by <code className="text-indigo-300 text-xs">engine_id</code> within a Zustand store, Engine 07 finishing before Engine 03 simply updates its isolated sub-tree. No race conditions occur.</span>
                   </div>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                   <div>
                     <strong className="block text-slate-200">Stale Stream Overwrites</strong>
                     <span className="text-slate-400">Every SSE payload includes a monotonic sequence number. Zustand reducers ignore payloads with a sequence number lower than the current state.</span>
                   </div>
                 </li>
               </ul>
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2"><Cpu className="text-blue-400"/> Deployment Architecture</h3>
            
            <div className="relative bg-slate-950 p-6 rounded-lg border border-slate-800 overflow-x-auto">
               <div className="min-w-[700px] flex justify-between items-center font-mono text-xs text-center relative z-10">
                 {/* Flow diagram mocked with divs */}
                 <div className="space-y-2">
                   <div className="w-24 h-16 bg-blue-500/20 border border-blue-500/50 rounded flex items-center justify-center text-blue-300">Client (React)</div>
                   <div className="text-slate-500 text-[10px]">Cloud CDN</div>
                 </div>
                 
                 <div className="text-slate-600">⟶</div>
                 
                 <div className="space-y-2">
                   <div className="w-28 h-16 bg-fuchsia-500/20 border border-fuchsia-500/50 rounded flex items-center justify-center text-fuchsia-300 flex-col">
                     <span>Load Balancer</span>
                     <span className="text-[9px] text-fuchsia-400/70">(Rate Limit)</span>
                   </div>
                   <div className="text-slate-500 text-[10px]">WAF / Gateway</div>
                 </div>
                 
                 <div className="text-slate-600">⟶</div>
                 
                 <div className="space-y-2">
                   <div className="w-28 h-16 bg-indigo-500/20 border border-indigo-500/50 rounded flex items-center justify-center text-indigo-300 flex-col">
                     <span>Auth / JWT</span>
                     <span className="text-[9px] text-indigo-400/70">Middleware</span>
                   </div>
                   <div className="text-slate-500 text-[10px]">API Node</div>
                 </div>
                 
                 <div className="text-slate-600">⟶</div>

                 <div className="space-y-2">
                   <div className="w-32 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center text-emerald-300 flex-col">
                     <span>core_brain</span>
                     <span className="text-[9px] text-emerald-400/70">(Router API)</span>
                   </div>
                   <div className="text-slate-500 text-[10px]">Docker / K8s</div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
               <div className="p-4 bg-slate-950 rounded border border-slate-800">
                 <h4 className="font-bold text-slate-200 text-sm mb-2">Auth & Rate Limiting</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">JWT verification and IP-based rate limiting sit at the Express Middleware layer (Strategy 3). The frontend securely stores the JWT in an HttpOnly cookie to prevent XSS exfiltration. High-compute engines (04, 07) have strict token tier checks applied before the Router dispatches to them.</p>
               </div>
               <div className="p-4 bg-slate-950 rounded border border-slate-800">
                 <h4 className="font-bold text-slate-200 text-sm mb-2">Frontend Containerization</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">The React frontend is bundled using Vite and served statically via Nginx within a multi-stage Dockerfile. Alternatively, server-side rendering (SSR) is decoupled to prevent blocking the high-throughput SSE engine streams.</p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'failures' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2"><ShieldAlert className="text-rose-400"/> Failure Modes & Error Boundaries</h3>
            
            <div className="space-y-4">
               <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg flex gap-4">
                 <ShieldAlert className="text-rose-400 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-slate-200 text-sm">Engine Timeout (Partial Failure)</h4>
                   <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                     If Engine 04 times out calculating a proof, but Engine 01 retrieves the facts, the workspace <strong>does not crash</strong>. 
                     The <code className="text-indigo-300">ErrorBoundaryPanel</code> for Engine 04 catches the local crash, rendering a smooth fallback UI: 
                     <em>"Math Engine unavailable. Retrying..."</em> while Engine 01's pane remains fully interactive.
                   </p>
                 </div>
               </div>

               <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg flex gap-4">
                 <ShieldAlert className="text-amber-400 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-slate-200 text-sm">Malformed Engine Output</h4>
                   <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                     Engine 03 (Code) returns invalid JSON formatting. The core_brain router catches this via Zod validation <strong>before</strong> sending the SSE update. Engine 11 (Audit) is immediately invoked to self-correct the payload. The UI shows: <em>"Engine 11: Formatting Correction in progress."</em>
                   </p>
                 </div>
               </div>

               <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex gap-4">
                 <ShieldAlert className="text-slate-400 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-slate-200 text-sm">Router Classification Failure</h4>
                   <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                     If the core_brain router cannot determine intent (confidence &lt; 0.4), it defaults to Engine 02 (Reasoning & Logic) as a generalized fallback, and prompts the user in the UI: <em>"Query ambiguity high. Falling back to generalized reasoning. Please specify 'Code', 'Finance', etc. for specialized routing."</em>
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
