import React, { useState } from "react";
import { Activity, Play, CheckCircle2, Clock, Terminal, Filter, RefreshCw } from "lucide-react";
import { AsyncTask } from "../../types";

interface TaskQueuePanelProps {
  tasks: AsyncTask[];
  onTriggerTask: (category: AsyncTask["category"]) => void;
  isAiProcessing: boolean;
}

export const TaskQueuePanel: React.FC<TaskQueuePanelProps> = ({
  tasks,
  onTriggerTask,
  isAiProcessing,
}) => {
  const [filter, setFilter] = useState<string>("all");

  const filteredTasks = filter === "all" ? tasks : tasks.filter((t) => t.category === filter);

  return (
    <div id="task-queue-panel" className="flex-1 bg-slate-950 p-6 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Asynchronous Job Queue & Non-Blocking Worker Threads</h2>
              <p className="text-xs text-slate-400">
                Heavy computations (LSP indexing, test suites, container builds) execute asynchronously in background queue.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTriggerTask("lsp")}
              disabled={isAiProcessing}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3.5 py-2 rounded-lg font-mono transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Spawn Background Job</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">Filter Category:</span>
          {["all", "lsp", "refactor", "test", "container", "security"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded border uppercase ${
                filter === cat
                  ? "bg-indigo-600 text-white border-indigo-500 font-bold"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task Cards List with Infinite Log Viewer */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono bg-slate-900 rounded-xl border border-slate-800">
              No tasks match category filter.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        task.status === "running"
                          ? "bg-amber-400 animate-ping"
                          : task.status === "completed"
                          ? "bg-emerald-400"
                          : "bg-slate-600"
                      }`}
                    />
                    <span className="text-slate-100 font-bold text-sm">{task.name}</span>
                    <span className="bg-slate-950 text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase text-[10px]">
                      {task.category}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center space-x-3">
                    <span>Started: {task.startTime}</span>
                    <span className="font-bold uppercase text-indigo-400">{task.status}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${task.progressPercentage}%` }}
                  />
                </div>

                {/* Infinite Scroll Terminal Log Viewer for task */}
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center space-x-1">
                    <Terminal className="w-3 h-3 text-indigo-400" />
                    <span>Real-time Stdout Log Stream:</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1 max-h-36 overflow-y-auto scrollbar-thin">
                    {task.logs.map((log, idx) => (
                      <div key={idx} className="leading-snug">
                        <span className="text-slate-600 mr-2">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
