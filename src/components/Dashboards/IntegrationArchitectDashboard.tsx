import React, { useState } from 'react';
import { Network, Server, Play, Palette, Database, Code, Cpu, Workflow, Lightbulb, Zap, Rocket, CheckCircle, Boxes, Share2, Layers, Brain } from 'lucide-react';

export const IntegrationArchitectDashboard = () => {
  const [activeTab, setActiveTab] = useState<"media" | "intelligence" | "design" | "coding" | "workflow">("workflow");

  const tabs = [
    { id: "media", label: "Generative Media", icon: <Palette size={18} /> },
    { id: "intelligence", label: "Intelligence (RAG)", icon: <Database size={18} /> },
    { id: "design", label: "Design & UI/UX", icon: <Layers size={18} /> },
    { id: "coding", label: "Software & Coding", icon: <Code size={18} /> },
    { id: "workflow", label: "Master Integration", icon: <Workflow size={18} /> },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
          <Share2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Architect of Integrated Intelligence</h1>
          <p className="text-sm text-slate-400">From Using Tools to Orchestrating Systems</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800 mb-6 shrink-0 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === tab.id 
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                : "bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === "media" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Palette className="text-fuchsia-400"/> Master Latent Space Control</h3>
              <p className="text-sm text-slate-400 mb-4">Move beyond basic prompting. Utilize Stable Diffusion (ComfyUI) with ControlNet (pose/structure), IP-Adapter (style), and LoRA (fine-tuning).</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Play className="text-indigo-400"/> Temporal Consistency</h3>
              <p className="text-sm text-slate-400 mb-4">In video generation, transition from text-to-video to image-to-video pipelines to maintain character and scene consistency.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Zap className="text-amber-400"/> Hybrid Audio Workflows</h3>
              <p className="text-sm text-slate-400 mb-4">Generate separated stems (drums, bass, melody) using AI, then arrange and master them in a DAW (Ableton/FL Studio) with spectral editing.</p>
            </div>
          </div>
        )}

        {activeTab === "intelligence" && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Database className="text-emerald-400"/> RAG Architectures</h3>
              <p className="text-sm text-slate-400 mb-4">Build systems that query private documents. Utilize Vector Databases (Pinecone, Milvus) to ground LLMs in factual, specific context without hallucination.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Brain className="text-blue-400"/> Agentic Reasoning</h3>
              <p className="text-sm text-slate-400 mb-4">Transition from single prompts to Agentic Workflows (LangChain/AutoGPT). Teach the AI to Plan → Research → Verify → Execute.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Network className="text-indigo-400"/> Data Synthesis</h3>
              <p className="text-sm text-slate-400 mb-4">Master Python (Pandas/NumPy) for data cleaning and transformation before injecting it into LLM analysis pipelines.</p>
            </div>
          </div>
        )}

        {activeTab === "design" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Boxes className="text-purple-400"/> Atomic Design</h3>
              <p className="text-sm text-slate-400 mb-4">Construct scalable visual languages by building small components (atoms) that combine into complex layouts (organisms).</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Layers className="text-rose-400"/> Design Tokens</h3>
              <p className="text-sm text-slate-400 mb-4">Transform design decisions (colors, spacing, typography) into code-readable JSON/CSS variables for universal application across platforms.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Lightbulb className="text-yellow-400"/> AI-Augmented Prototyping</h3>
              <p className="text-sm text-slate-400 mb-4">Use AI-assisted Figma plugins to generate base layouts, shifting human focus to UX logic, state management, and interaction design.</p>
            </div>
          </div>
        )}

        {activeTab === "coding" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Code className="text-emerald-400"/> AI-Augmented Development</h3>
              <p className="text-sm text-slate-400 mb-4">Master pair-programming with AI (Cursor/Copilot). Focus on architecting system prompts, debugging complex states, and reviewing logic over memorizing syntax.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Server className="text-orange-400"/> API-First Architecture</h3>
              <p className="text-sm text-slate-400 mb-4">Connect disparate systems via REST APIs and GraphQL. Build pipelines that chain Python scripts, Leonardo.ai APIs, and Discord Webhooks autonomously.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Cpu className="text-blue-400"/> DevOps & Containerization</h3>
              <p className="text-sm text-slate-400 mb-4">Package applications using Docker to ensure environment consistency. Implement CI/CD pipelines to automate deployment and integration.</p>
            </div>
          </div>
        )}
        
        {activeTab === "workflow" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2"><Workflow className="text-blue-400"/> The Master Integration Pipeline</h3>
            
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-800 rounded-full z-0 hidden md:block"></div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center shrink-0">1</div>
                <div className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-emerald-300">Intelligence Layer</h4>
                  <p className="text-sm text-slate-400">A Python agent (LangChain) scrapes news about a specific niche and structures data.</p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-fuchsia-500/50 text-fuchsia-400 flex items-center justify-center shrink-0">2</div>
                <div className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-fuchsia-300">Content Layer</h4>
                  <p className="text-sm text-slate-400">The agent summarizes the news and sends a structured prompt to Stable Diffusion API for a custom infographic.</p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-rose-500/50 text-rose-400 flex items-center justify-center shrink-0">3</div>
                <div className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-rose-300">Design Layer</h4>
                  <p className="text-sm text-slate-400">The infographic is automatically injected into a React template applying pre-defined Design Tokens.</p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-blue-500/50 text-blue-400 flex items-center justify-center shrink-0">4</div>
                <div className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-300">Deployment Layer</h4>
                  <p className="text-sm text-slate-400">The complete system is containerized via Docker and deployed to AWS, auto-publishing to a web dashboard.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-900/10 border border-blue-500/30 rounded-xl">
              <h4 className="font-bold text-blue-400 mb-3">Recommended Learning Stack</h4>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"><strong className="text-blue-400">Language:</strong> Python</span>
                <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"><strong className="text-emerald-400">Logic:</strong> Prompt Eng + LangChain</span>
                <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"><strong className="text-fuchsia-400">Control:</strong> Stable Diffusion + ControlNet</span>
                <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"><strong className="text-rose-400">Structure:</strong> React + Tailwind CSS</span>
                <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"><strong className="text-orange-400">Infra:</strong> Docker</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
