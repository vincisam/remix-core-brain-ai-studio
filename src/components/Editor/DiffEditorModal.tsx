import React from "react";
import { DiffEditor } from "@monaco-editor/react";
import { RefactorDiff } from "../../types";
import { Check, X, Sparkles, Tag, FileDiff } from "lucide-react";

interface DiffEditorModalProps {
  diff: RefactorDiff | null;
  onAccept: (newCode: string) => void;
  onReject: () => void;
}

export const DiffEditorModal: React.FC<DiffEditorModalProps> = ({
  diff,
  onAccept,
  onReject,
}) => {
  if (!diff) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
              <FileDiff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <span>AI Refactoring Preview & Diff Inspection</span>
                <span className="text-xs font-mono text-slate-400 font-normal">({diff.filename})</span>
              </h3>
              <p className="text-xs text-slate-400">{diff.explanation}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onReject}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>
            <button
              onClick={() => onAccept(diff.refactoredCode)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept & Apply Refactor</span>
            </button>
          </div>
        </div>

        {/* Refactoring Metadata Tags */}
        <div className="px-5 py-2 border-b border-slate-800 bg-slate-900/50 flex items-center space-x-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-400 text-[11px] uppercase">Refactor Tags:</span>
          {diff.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full flex items-center space-x-1 text-[11px]"
            >
              <Tag className="w-3 h-3 text-indigo-400" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Monaco Side-by-Side Diff Canvas */}
        <div className="flex-1 relative">
          <DiffEditor
            height="100%"
            original={diff.originalCode}
            modified={diff.refactoredCode}
            language="typescript"
            theme="vs-dark"
            options={{
              fontSize: 13,
              readOnly: true,
              renderSideBySide: true,
              automaticLayout: true,
              minimap: { enabled: false },
            }}
          />
        </div>

        {/* Diff Line Change Summary Footer */}
        {diff.diffSummary && diff.diffSummary.length > 0 && (
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs font-mono text-slate-300">
            <div className="font-semibold text-slate-400 mb-1">Key Refactoring Transformations:</div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px] max-h-20 overflow-y-auto">
              {diff.diffSummary.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
