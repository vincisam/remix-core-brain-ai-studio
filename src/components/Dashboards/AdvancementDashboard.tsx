import React, { useState } from 'react';
import { Brain, Dna, Cpu, Rocket, Zap, BookOpen, Activity, Fingerprint, BatteryCharging, Orbit, Microchip, Layers } from 'lucide-react';

export const AdvancementDashboard = () => {
  const [activeTab, setActiveTab] = useState<"cognitive" | "biological" | "technological" | "cosmic">("cognitive");

  const tabs = [
    { id: "cognitive", label: "Cognitive", icon: <Brain size={18} /> },
    { id: "biological", label: "Biological", icon: <Dna size={18} /> },
    { id: "technological", label: "Technological", icon: <Cpu size={18} /> },
    { id: "cosmic", label: "Cosmic", icon: <Rocket size={18} /> },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
          <Layers size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Evolutionary Advancement</h1>
          <p className="text-sm text-slate-400">Multi-Frontier Capability Vectors</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800 mb-6 shrink-0 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === tab.id 
                ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" 
                : "bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === "cognitive" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Zap className="text-amber-400"/> First Principles Thinking</h3>
              <p className="text-sm text-slate-400 mb-4">Move away from reasoning by analogy and toward reasoning from fundamental truths. This is the method used by the greatest physicists and engineers to solve "unsolvable" problems.</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Fingerprint className="text-blue-400"/> Cognitive Augmentation (BCI)</h3>
              <p className="text-sm text-slate-400 mb-4">The integration of Human-Computer Interfaces. Advancing involves transitioning from "using" tools to "merging" with them, effectively increasing your bandwidth for information processing.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><BookOpen className="text-purple-400"/> Epistemic Rigor</h3>
              <p className="text-sm text-slate-400 mb-4">Developing the ability to distinguish between high-probability truths and low-probability noise. In an era of information density, the ability to filter truth is a primary survival and advancement mechanism.</p>
            </div>
          </div>
        )}

        {activeTab === "biological" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Dna className="text-emerald-400"/> Genetic Engineering</h3>
              <p className="text-sm text-slate-400 mb-4">Moving from random evolution to directed evolution. This involves optimizing the human genome for disease resistance, increased cognitive capacity, and metabolic efficiency (CRISPR/Cas9).</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Activity className="text-rose-400"/> Longevity Science</h3>
              <p className="text-sm text-slate-400 mb-4">Addressing the biological hallmarks of aging. Advancing the universe requires a longer "intellectual runway"—extending the period during which a high-functioning mind can contribute to progress.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Layers className="text-teal-400"/> Synthetic Biology</h3>
              <p className="text-sm text-slate-400 mb-4">Creating entirely new biological systems that can perform tasks organic life cannot, such as carbon sequestration or high-efficiency energy production.</p>
            </div>
          </div>
        )}

        {activeTab === "technological" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Brain className="text-fuchsia-400"/> Artificial General Intelligence</h3>
              <p className="text-sm text-slate-400 mb-4">The creation of non-biological intelligence that meets or exceeds human capability across all domains. AGI acts as a force multiplier for all other forms of advancement.</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Microchip className="text-cyan-400"/> Quantum Supremacy</h3>
              <p className="text-sm text-slate-400 mb-4">Moving beyond binary computing into quantum computation. This allows for the simulation of complex molecular structures and the solving of mathematical problems that are currently intractable.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><BatteryCharging className="text-yellow-400"/> Energy Transduction</h3>
              <p className="text-sm text-slate-400 mb-4">Developing high-efficiency fusion energy. A civilization cannot advance if it is limited by the energy density of chemical fuels. Mastering nuclear fusion is the gateway to Type I status.</p>
            </div>
          </div>
        )}

        {activeTab === "cosmic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Rocket className="text-orange-400"/> Interstellar Propulsion</h3>
              <p className="text-sm text-slate-400 mb-4">Moving beyond chemical rockets toward theoretical models like Alcubierre Drives (Warp Drives) or Solar Sails to bridge the gap between star systems.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Layers className="text-slate-400"/> Matter Manipulation</h3>
              <p className="text-sm text-slate-400 mb-4">The ability to reconfigure atoms at will via nanotechnology. This would effectively end scarcity, as any object could be synthesized from basic elemental feedstock.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2"><Orbit className="text-blue-400"/> Large-Scale Engineering</h3>
              <p className="text-sm text-slate-400 mb-4">The construction of megastructures like Dyson Spheres or Swarms to capture the total energy output of a star, providing the power necessary for multi-planetary existence.</p>
            </div>
          </div>
        )}
        
        {/* Synthesis Table */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-slate-200 mb-4">Summary of Advancement Vectors</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-sm">
                  <th className="py-3 px-4 font-semibold">Scale</th>
                  <th className="py-3 px-4 font-semibold">Primary Objective</th>
                  <th className="py-3 px-4 font-semibold">Key Technology/Method</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-300">
                <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400">Individual</td>
                  <td className="py-3 px-4">Cognitive Throughput</td>
                  <td className="py-3 px-4 font-mono text-xs">BCI, First Principles, Meta-learning</td>
                </tr>
                <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400">Biological</td>
                  <td className="py-3 px-4">Biological Immortality</td>
                  <td className="py-3 px-4 font-mono text-xs">CRISPR, Longevity Science, Synthetic Bio</td>
                </tr>
                <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-fuchsia-400">Civilization</td>
                  <td className="py-3 px-4">Energy & Intelligence</td>
                  <td className="py-3 px-4 font-mono text-xs">AGI, Nuclear Fusion, Quantum Computing</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-orange-400">Cosmic</td>
                  <td className="py-3 px-4">Spatiotemporal Expansion</td>
                  <td className="py-3 px-4 font-mono text-xs">Alcubierre Drives, Nanotechnology, Dyson Swarms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg text-sm text-indigo-200">
            <strong className="text-indigo-400">Synthesis:</strong> True advancement is not linear but exponential and interconnected. A breakthrough in <strong>Quantum Computing</strong> (Technological) accelerates <strong>Longevity Science</strong> (Biological), which extends the <strong>Intellectual Runway</strong> (Individual) required to master <strong>Interstellar Travel</strong> (Cosmic).
          </div>
        </div>
      </div>
    </div>
  );
};
