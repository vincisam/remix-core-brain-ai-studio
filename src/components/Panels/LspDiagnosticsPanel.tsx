import React from "react";
import { AlertTriangle, ShieldCheck, Check, Bug, Zap, Layers, FileCode, Wrench } from "lucide-react";
import { LSPDiagnostic, LSPSymbol } from "../../types";

interface LspDiagnosticsPanelProps {
  diagnostics: LSPDiagnostic[];
  symbols: LSPSymbol[];
  securityScore: number;
  vulnerabilities: string[];
  complexityScore: string;
  onApplyQuickFix: (fix: string) => void;
  onRefreshLsp: () => void;
  isAiProcessing: boolean;
  filename: string;
}

export const LspDiagnosticsPanel: React.FC<LspDiagnosticsPanelProps> = ({
  diagnostics,
  symbols,
  securityScore,
  vulnerabilities,
  complexityScore,
  onApplyQuickFix,
  onRefreshLsp,
  isAiProcessing,
  filename,
}) => {
  return (
    <div id="lsp-diagnostics-panel" className="flex-1 bg-slate-950 p-6 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span>Lightweight LSP Engine & Static Diagnostics</span>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-normal">
                  {filename}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Low-latency type inference, syntax checking, OWASP security audit, and symbol outline.
              </p>
            </div>
          </div>

          <button
            onClick={onRefreshLsp}
            disabled={isAiProcessing}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-lg font-mono transition"
          >
            <Zap className={`w-3.5 h-3.5 ${isAiProcessing ? "animate-spin text-amber-400" : "text-emerald-400"}`} />
            <span>Re-Run LSP Scan</span>
          </button>
        </div>

        {/* Security & Complexity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-mono">Security Vulnerability Audit</div>
              <div className="text-lg font-bold text-slate-100 font-mono">
                {securityScore} / 100 Score
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
            <Bug className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-mono">Active Diagnostics</div>
              <div className="text-lg font-bold text-slate-100 font-mono">
                {diagnostics.length} Issues
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
            <Zap className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-mono">Algorithmic Complexity</div>
              <div className="text-lg font-bold text-slate-100 font-mono">
                {complexityScore}
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostics Issues List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md">
          <div className="text-xs font-semibold text-slate-200 font-mono flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>LSP Diagnostics & Static Code Inspections ({diagnostics.length})</span>
          </div>

          {diagnostics.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 font-mono bg-slate-950 rounded-lg border border-slate-800">
              ✓ No LSP diagnostics or syntax issues detected in active file.
            </div>
          ) : (
            <div className="space-y-2 font-mono text-xs">
              {diagnostics.map((diag) => (
                <div
                  key={diag.id}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-rose-400 font-bold uppercase text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                        Line {diag.line}
                      </span>
                      <span className="text-slate-200 font-medium">{diag.message}</span>
                    </div>
                    {diag.rule && <div className="text-[10px] text-slate-500">Rule: {diag.rule}</div>}
                  </div>

                  {diag.quickFix && (
                    <button
                      onClick={() => onApplyQuickFix(diag.quickFix!)}
                      className="flex items-center space-x-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] px-2.5 py-1 rounded font-medium transition shrink-0 ml-3"
                    >
                      <Wrench className="w-3 h-3" />
                      <span>Apply Quick Fix</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Symbol Outline Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md">
          <div className="text-xs font-semibold text-slate-200 font-mono flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>LSP Symbol Outline ({symbols.length} Symbols Indexed)</span>
          </div>

          {symbols.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 font-mono bg-slate-950 rounded-lg border border-slate-800">
              No top-level functions or classes extracted yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {symbols.map((sym, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="text-blue-300 font-bold">{sym.name}</div>
                    <div className="text-[10px] text-slate-500">{sym.signature}</div>
                  </div>
                  <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                    Line {sym.line}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
