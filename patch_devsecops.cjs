const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/DevSecOpsDashboard.tsx', 'utf-8');

if (!content.includes('engine11')) {
    content = content.replace(
        'useState<"overview" | "docker" | "monitoring" | "security">("overview");',
        'useState<"overview" | "docker" | "monitoring" | "security" | "engine11">("overview");'
    );
    
    content = content.replace(
        '</div>\n\n      <div className="flex-1 overflow-y-auto',
        `        <button
          onClick={() => setActiveTab("engine11")}
          className={\`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap \${activeTab === 'engine11' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}\`}
        >
          <div className="flex items-center gap-2"><ShieldAlert size={16} /> Engine 11 Sandbox</div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto`
    );

    const engine11Content = `
        {activeTab === 'engine11' && (
          <div className="space-y-6 h-full flex flex-col">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
              <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                <ShieldAlert size={18} className="text-emerald-400" /> Engine 11 Safety Injection
              </h3>
              <p className="text-sm text-slate-400 mb-6 border-l-2 border-emerald-500 pl-3">
                Current threshold set to strictly monitor code injections and prompt leakage. Adjusting these overrides requires Sandbox Verification.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-200">Strict Code Injection Monitor</h4>
                    <p className="text-xs text-slate-500">Blocks anomalous code execution patterns and unauthorized shell invocations.</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">ENFORCED</div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-200">Prompt Leakage Prevention</h4>
                    <p className="text-xs text-slate-500">Filters outputs that match system instruction heuristics.</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">ENFORCED</div>
                </div>
                
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-200">Automated Sandbox Environment</h4>
                    <p className="text-xs text-slate-500">Validates generated payloads within isolated ephemeral containers before delivery.</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">ACTIVE</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <button className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                   <Shield size={16} /> Request Sandbox Verification
                </button>
              </div>
            </div>
          </div>
        )}
`;

    content = content.replace(
        '</DevSecOpsDashboard>;\n};',
        '</DevSecOpsDashboard>;\n};' // fallback
    );
    
    // Add inside the main flex-1 div
    content = content.replace(
        '      </div>\n    </div>\n  );\n};\n',
        engine11Content + '      </div>\n    </div>\n  );\n};\n'
    );
}

fs.writeFileSync('src/components/Dashboards/DevSecOpsDashboard.tsx', content);
