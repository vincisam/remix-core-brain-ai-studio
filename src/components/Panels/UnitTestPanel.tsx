import React from "react";
import { TestTube2, Play, CheckCircle2, XCircle, Clock, Sparkles, FileCode, BarChart3 } from "lucide-react";
import { UnitTestSuite } from "../../types";

interface UnitTestPanelProps {
  suite: UnitTestSuite | null;
  onRunAllTests: () => void;
  onGenerateTests: () => void;
  isAiProcessing: boolean;
  filename: string;
}

export const UnitTestPanel: React.FC<UnitTestPanelProps> = ({
  suite,
  onRunAllTests,
  onGenerateTests,
  isAiProcessing,
  filename,
}) => {
  return (
    <div id="unit-test-panel" className="flex-1 bg-slate-950 p-6 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <TestTube2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span>Comprehensive Unit Test Suite</span>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-normal">
                  {filename}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automated test generation, edge-case assertions, and code coverage analysis for high reliability.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onGenerateTests}
              disabled={isAiProcessing}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-lg font-medium transition"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiProcessing ? "animate-spin text-emerald-400" : ""}`} />
              <span>Generate AI Tests</span>
            </button>
            <button
              onClick={onRunAllTests}
              disabled={isAiProcessing || !suite}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs px-4 py-2 rounded-lg font-medium shadow transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Test Suite</span>
            </button>
          </div>
        </div>

        {!suite ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl space-y-3 bg-slate-900/30">
            <TestTube2 className="w-8 h-8 text-emerald-400 animate-bounce mx-auto" />
            <div className="text-sm font-semibold text-slate-200">No Unit Test Suite Generated Yet</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Click 'Generate AI Tests' to generate automated Vitest/Jest/PyTest unit tests covering positive flows, edge cases, and error handling.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Test Execution Summary Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Test Status</div>
                  <div className="text-base font-bold text-slate-100 font-mono">
                    {suite.testCases.filter((tc) => tc.status === "passed").length} / {suite.testCases.length} Passed
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-blue-400 shrink-0" />
                <div className="flex-1">
                  <div className="text-[11px] text-slate-400 uppercase font-mono justify-between flex">
                    <span>Estimated Coverage</span>
                    <span className="text-blue-400 font-bold">{suite.coveragePercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-1.5 border border-slate-800">
                    <div
                      className="bg-blue-500 h-full transition-all duration-500"
                      style={{ width: `${suite.coveragePercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
                <Clock className="w-8 h-8 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Framework & Speed</div>
                  <div className="text-sm font-bold text-slate-100 font-mono">
                    {suite.framework} ({suite.testCases.reduce((acc, c) => acc + (c.durationMs || 0), 0)}ms)
                  </div>
                </div>
              </div>
            </div>

            {/* Test Cases Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Test Case Assertion</span>
                <span className="font-mono text-slate-500">Last run: {suite.lastRunAt || "Just now"}</span>
              </div>

              <div className="divide-y divide-slate-800/60 font-mono text-xs">
                {suite.testCases.map((tc) => (
                  <div key={tc.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/30 transition">
                    <div className="flex items-center space-x-3">
                      {tc.status === "passed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-slate-200 font-medium">{tc.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center space-x-2 mt-0.5">
                          <span className="uppercase px-1.5 py-0.2 bg-slate-950 border border-slate-800 rounded">
                            {tc.type}
                          </span>
                          <span>Coverage: {tc.expectedCoverage}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono">{tc.durationMs}ms</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Test Code View */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-mono font-semibold text-slate-300 flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Generated Test File Code ({suite.filename}):</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto max-h-60">
                {suite.testCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
