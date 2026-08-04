const fs = require('fs');
const appTsxPath = 'src/components/Dashboards/EvolutionDashboard.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

const target = `{/* Action Logs Grid */}`;
const replace = `{/* Backend Daemon Global Log */}
        {daemonLogs.length > 0 && (
          <div className="bg-slate-900 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)] rounded-xl flex flex-col overflow-hidden max-h-48 shrink-0">
            <div className="p-3 border-b border-emerald-500/30 bg-emerald-900/20 sticky top-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Backend Daemon Sync</h3>
              </div>
              <RefreshCw size={14} className="text-emerald-400 animate-spin" />
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-1 font-mono text-[10px] text-emerald-400">
              {daemonLogs.map((l, idx) => (
                 <div key={idx} className="break-words">{l}</div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Logs Grid */}`;

content = content.replace(target, replace);
fs.writeFileSync(appTsxPath, content);
