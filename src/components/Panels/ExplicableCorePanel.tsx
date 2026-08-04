import React from "react";
import { BookOpen, ShieldCheck, Cpu, Layers, Activity, Lock, RefreshCw, AlertCircle } from "lucide-react";
import { ExplicableReport } from "../../types";

interface ExplicableCorePanelProps {
  report: ExplicableReport | null;
  onRefreshReport: () => void;
  isAiProcessing: boolean;
  filename: string;
}

export const ExplicableCorePanel: React.FC<ExplicableCorePanelProps> = ({
  report,
  onRefreshReport,
  isAiProcessing,
  filename,
}) => {
  return (
    <div id="explicable-core-panel" className="flex-1 bg-[#09090b] p-6 overflow-y-auto font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
                <span>Explicable Core Reasoning</span>
                <span className="text-xs font-mono bg-[#1c1c1f] text-zinc-300 px-2.5 py-0.5 rounded-full border border-[#27272a] font-normal">
                  {filename}
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Transparent AI reasoning breakdown, Big-O complexity analysis, and local workflow verification.
              </p>
            </div>
          </div>

          <button
            onClick={onRefreshReport}
            disabled={isAiProcessing}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAiProcessing ? "animate-spin" : ""}`} />
            <span>Re-Analyze Core</span>
          </button>
        </div>

        {/* Loading state or display */}
        {!report ? (
          <div className="p-12 text-center border border-dashed border-[#27272a] rounded-xl space-y-3 bg-[#121214]">
            <Activity className="w-8 h-8 text-blue-400 animate-pulse mx-auto" />
            <div className="text-sm font-semibold text-zinc-200">Explicable Core Analysis Pending</div>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Click 'Re-Analyze Core' to generate an explicit visual breakdown of algorithmic time complexity, data privacy parameters, and execution steps.
            </p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Architectural Overview Card */}
            <div className="bg-[#1c1c1f] border border-[#27272a] rounded-xl p-5 space-y-3 shadow-md">
              <div className="flex items-center space-x-2 text-zinc-200 font-semibold text-sm">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>1. Architectural System Overview</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#09090b] p-3.5 rounded-lg border border-[#27272a] font-mono">
                {report.architectureOverview}
              </p>
            </div>

            {/* Algorithmic Complexity Metrics Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1c1c1f] border border-[#27272a] rounded-xl p-5 space-y-3 shadow-md">
                <div className="flex items-center space-x-2 text-zinc-200 font-semibold text-sm">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>2. Big-O Complexity Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#09090b] p-3 rounded-lg border border-[#27272a] text-center">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Time Complexity</div>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                      {report.algorithmicComplexity?.timeComplexity || "O(N)"}
                    </div>
                  </div>
                  <div className="bg-[#09090b] p-3 rounded-lg border border-[#27272a] text-center">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Space Complexity</div>
                    <div className="text-lg font-bold font-mono text-blue-400 mt-0.5">
                      {report.algorithmicComplexity?.spaceComplexity || "O(1)"}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
                  {report.algorithmicComplexity?.explanation}
                </p>
              </div>

              {/* Data Privacy & Zero Retention Card */}
              <div className="bg-[#1c1c1f] border border-[#27272a] rounded-xl p-5 space-y-3 shadow-md">
                <div className="flex items-center space-x-2 text-zinc-200 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>3. Privacy & Local Workflow Audit</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-[#09090b] p-2.5 rounded-lg border border-[#27272a]">
                    <span className="text-zinc-400 font-mono">Exfiltration Risk:</span>
                    <span className="font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
                      {report.dataPrivacyAudit?.networkDataExfiltrationRisk || "Zero Risk"}
                    </span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed bg-[#09090b] p-2.5 rounded-lg border border-[#27272a] text-[11px]">
                    {report.dataPrivacyAudit?.localWorkflowBoundaries}
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Execution Trace */}
            <div className="bg-[#1c1c1f] border border-[#27272a] rounded-xl p-5 space-y-3 shadow-md">
              <div className="flex items-center space-x-2 text-zinc-200 font-semibold text-sm">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>4. Step-by-Step Algorithmic Execution Trace</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {report.executionTrace?.map((step) => (
                  <div key={step.step} className="flex items-start space-x-3 bg-[#09090b] p-3 rounded-lg border border-[#27272a]">
                    <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded text-[11px] font-bold">
                      Step {step.step}
                    </span>
                    <div className="flex-1 space-y-0.5">
                      <div className="text-zinc-200 font-semibold">{step.component}</div>
                      <div className="text-zinc-400 text-[11px]">{step.behavior}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

