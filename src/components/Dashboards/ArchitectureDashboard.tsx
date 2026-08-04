import React, { useState } from 'react';
import { Database, BrainCircuit, Wrench, Activity, Cloud, Workflow, GitBranch, Shield, Zap, Server, Network, Infinity } from 'lucide-react';

export const ArchitectureDashboard = () => {
  const [activeTab, setActiveTab] = useState<"memory" | "cognitive" | "agentic" | "evolutionary" | "infrastructure" | "dol">("cognitive");

  const tabs = [
    { id: "dol", label: "Dynamic Routing (DOL)", icon: <Network size={18} /> },
    { id: "cognitive", label: "Cognitive Architecture", icon: <BrainCircuit size={18} /> },
    { id: "memory", label: "Tri-Tier Memory", icon: <Database size={18} /> },
    { id: "evolutionary", label: "Autonomous LLMOps", icon: <Infinity size={18} /> },
    { id: "infrastructure", label: "Distributed Edge", icon: <Cloud size={18} /> },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
          <Workflow size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">System Architecture Expansion</h1>
          <p className="text-sm text-slate-400">Advanced Platform Capabilities Configuration</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800 mb-6 shrink-0 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === tab.id 
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                : "bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
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

        {activeTab === "cognitive" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"><BrainCircuit className="text-indigo-400"/> Recursive Reasoning & Multi-Agent Logic</h3>
            <p className="text-sm text-slate-400 mb-6">Transitioning from simple routing to dynamic Agentic Reasoning Loops where engines debate, critique, and verify responses.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">Multi-Agent Debate (MAD)</h4>
                <p className="text-xs text-slate-400">core_brain assigns competing engines (e.g., Engine 02 and Engine 04) to solve the same problem. A third engine acts as judge to find consensus, eliminating hallucinations.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">Tree-of-Thought (ToT)</h4>
                <p className="text-xs text-slate-400">Generates multiple reasoning branches, evaluates viability at each step, and prunes weak paths. Essential for complex, non-linear logic and strategy.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">Self-Reflection Loops</h4>
                <p className="text-xs text-slate-400">Before final output, Engine 11 forces the generating engine to critique its own work and rewrite it, dramatically increasing polish and correctness.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "memory" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"><Database className="text-blue-400"/> Tri-Tier Memory Architecture</h3>
            <p className="text-sm text-slate-400 mb-6">Overcoming session amnesia with persistent, multi-layered cognitive data structures.</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold">T1</div>
                <div>
                  <h4 className="font-bold text-slate-200">Sensory Memory (Short-Term)</h4>
                  <p className="text-xs text-slate-400 mt-1">Immediate context window of the current conversation (e.g., Gemini 1.5 Pro's 2M token window). Processes active dialogue streams.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold">T2</div>
                <div>
                  <h4 className="font-bold text-slate-200">Episodic Memory (Mid-Term)</h4>
                  <p className="text-xs text-slate-400 mt-1">Vector Database (Pinecone/Milvus) storing past interactions as embeddings. Allows AI to recall what was discussed across previous sessions using similarity search.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800 border-l-2 border-l-emerald-500">
                <div className="w-10 h-10 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">T3</div>
                <div>
                  <h4 className="font-bold text-slate-200">Semantic Memory (Long-Term / GraphRAG)</h4>
                  <p className="text-xs text-slate-400 mt-1">Knowledge Graph (Neo4j) understanding entity relationships (e.g., Einstein -&gt; Relativity -&gt; Physics). Enables advanced Graph-based Retrieval-Augmented Generation.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "evolutionary" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"><Infinity className="text-rose-400"/> Autonomous LLMOps CI/CD</h3>
            <p className="text-sm text-slate-400 mb-6">Self-updating logic permitting backend system modifications without human intervention.</p>
            
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800"></div>
              
              <div className="relative flex gap-6 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center z-10 shrink-0">
                  <Activity size={20} className="text-rose-400" />
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-slate-200">1. Monitoring Agent</h4>
                  <p className="text-sm text-slate-400">Tracks "Failure Events" (e.g., Engine 11 flags hallucination or user corrections).</p>
                </div>
              </div>
              
              <div className="relative flex gap-6 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-orange-500 flex items-center justify-center z-10 shrink-0">
                  <Wrench size={20} className="text-orange-400" />
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-slate-200">2. Synthesis Agent (Engine 03)</h4>
                  <p className="text-sm text-slate-400">Analyzes failure patterns and writes new system prompts, code modules, or retrieval logic to patch.</p>
                </div>
              </div>
              
              <div className="relative flex gap-6 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center z-10 shrink-0">
                  <Shield size={20} className="text-blue-400" />
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-slate-200">3. Sandbox Agent (Engine 11)</h4>
                  <p className="text-sm text-slate-400">Runs synthesized code in virtualized container isolation (Regression Testing).</p>
                </div>
              </div>
              
              <div className="relative flex gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center z-10 shrink-0">
                  <GitBranch size={20} className="text-emerald-400" />
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-slate-200">4. Deployment Agent (Engine 10)</h4>
                  <p className="text-sm text-slate-400">Executes Git hooks and K8s rolling updates to push new logic to live production environment.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "infrastructure" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"><Server className="text-blue-400"/> Micro-Agent Containerization</h3>
              <p className="text-sm text-slate-400 mb-6">Docker/Kubernetes pod isolation for every engine to manage massive global scale.</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-200 font-mono text-sm">Engine 03 (Code)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400">Auto-Scaled</span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">100 Instances</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-200 font-mono text-sm">Engine 09 (Creative)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Baseline</span>
                    <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs">1 Instance</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-200 font-mono text-sm">Engine 11 (Audit)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400">Dynamic</span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">25 Instances</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"><Cloud className="text-sky-400"/> Edge Deployment Topology</h3>
              <p className="text-sm text-slate-400 mb-6">Routing simple tasks to edge nodes, reserving heavy reasoning for core clusters.</p>
              
              <div className="relative h-48 border border-slate-800 rounded-lg bg-slate-950 overflow-hidden flex flex-col justify-center p-4">
                <div className="flex justify-between items-center w-full mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-500/50 flex items-center justify-center mx-auto mb-2 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                      <Cloud size={20} className="text-sky-400" />
                    </div>
                    <div className="text-xs font-bold text-sky-400">Edge Node</div>
                    <div className="text-[10px] text-slate-500">Llama 3 / Mistral</div>
                  </div>
                  
                  <div className="flex-1 px-4 text-center text-[10px] text-slate-500 uppercase tracking-wider relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -z-10"></div>
                    <span className="bg-slate-950 px-2">Complex Reasoning</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      <BrainCircuit size={28} className="text-indigo-400" />
                    </div>
                    <div className="text-xs font-bold text-indigo-400">Core Brain Cluster</div>
                    <div className="text-[10px] text-slate-500">Gemini 1.5 Pro / GPT-4o</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
