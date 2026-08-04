import React, { useState } from "react";
import { Puzzle, Plus, Sparkles, CheckCircle2, Play, Code, Shield, Power } from "lucide-react";
import { EditorPlugin } from "../../types";

interface PluginManagerPanelProps {
  plugins: EditorPlugin[];
  onTogglePlugin: (id: string) => void;
  onGeneratePlugin: (prompt: string) => void;
  onRunPluginManually: (id: string) => void;
  isAiProcessing: boolean;
}

export const PluginManagerPanel: React.FC<PluginManagerPanelProps> = ({
  plugins,
  onTogglePlugin,
  onGeneratePlugin,
  onRunPluginManually,
  isAiProcessing,
}) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(plugins[0]?.id || null);

  const selectedPlugin = plugins.find((p) => p.id === selectedPluginId) || plugins[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim() || isAiProcessing) return;
    onGeneratePlugin(userPrompt.trim());
    setUserPrompt("");
  };

  return (
    <div id="plugin-manager-panel" className="flex-1 bg-slate-950 p-6 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Puzzle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Modular Plugin Architecture & Extension Engine</h2>
              <p className="text-xs text-slate-400">
                Extend editor functionality with custom workflow hooks, event triggers (\`onSave\`, \`onType\`), and AI extension generators.
              </p>
            </div>
          </div>
        </div>

        {/* AI Plugin Builder Box */}
        <form onSubmit={handleGenerate} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Self-Development Extension Builder (AI Powered)</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="E.g., Build an extension that logs TODO comments and sends slack webhooks..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              disabled={!userPrompt.trim() || isAiProcessing}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs px-4 py-2 rounded-lg font-medium shadow transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Extension</span>
            </button>
          </div>
        </form>

        {/* Plugin Grid & Detail Code Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plugin List Cards */}
          <div className="lg:col-span-1 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Installed Extensions ({plugins.length})
            </div>

            {plugins.map((plugin) => {
              const isSelected = plugin.id === selectedPluginId;
              return (
                <div
                  key={plugin.id}
                  onClick={() => setSelectedPluginId(plugin.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 border-indigo-500/50 shadow-md"
                      : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-100 flex items-center space-x-1.5">
                      <span>{plugin.name}</span>
                      {plugin.builtIn && (
                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                          Built-in
                        </span>
                      )}
                    </span>

                    {/* Enable Switch */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlugin(plugin.id);
                      }}
                      className={`p-1 rounded-full transition ${
                        plugin.enabled ? "text-emerald-400 bg-emerald-500/10" : "text-slate-600 bg-slate-800"
                      }`}
                      title={plugin.enabled ? "Disable Extension" : "Enable Extension"}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">{plugin.description}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                      Event: {plugin.eventTrigger}
                    </span>
                    <span>v{plugin.version}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plugin Code Inspector & Testing Console */}
          {selectedPlugin && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-md flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                    <span>{selectedPlugin.name}</span>
                    <span className="text-xs font-mono text-indigo-400">({selectedPlugin.id})</span>
                  </h3>
                  <p className="text-xs text-slate-400">{selectedPlugin.description}</p>
                </div>

                <button
                  onClick={() => onRunPluginManually(selectedPlugin.id)}
                  className="flex items-center space-x-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-lg font-mono transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Handler</span>
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                  <Code className="w-3.5 h-3.5 text-blue-400" />
                  <span>JavaScript Plugin Handler Logic:</span>
                </div>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  {selectedPlugin.handlerCode}
                </pre>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Permissions: {selectedPlugin.permissions.join(", ")}</span>
                </div>
                <div>Author: {selectedPlugin.author}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
