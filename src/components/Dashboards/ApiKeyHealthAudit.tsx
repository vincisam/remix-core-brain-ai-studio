import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

interface AuditResult {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
}

export const ApiKeyHealthAudit = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<AuditResult[] | null>(null);

  const runAudit = () => {
    setIsAuditing(true);
    setResults(null);
    
    // Simulate network delay for diagnostic check
    setTimeout(() => {
      const mockResults: AuditResult[] = [
        {
          id: '1',
          name: 'Production Key',
          status: 'healthy',
          issues: ['All configurations valid', 'Quota at 45%'],
        },
        {
          id: '2',
          name: 'Sandbox (Test)',
          status: 'warning',
          issues: ['Nearing quota limit (85% used)'],
        },
        {
          id: '3',
          name: 'Legacy Integration',
          status: 'critical',
          issues: ['Expired on Oct 01, 2025', 'Invalid scope: legacy:read'],
        }
      ];
      setResults(mockResults);
      setIsAuditing(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col min-h-0 h-full overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <div>
          <h3 className="font-bold text-slate-200 flex items-center gap-2 mb-1">
            <ShieldAlert className="text-amber-400" /> API Key Health Audit
          </h3>
          <p className="text-sm text-slate-400">Run diagnostic checks to verify key configurations, expirations, and quotas.</p>
        </div>
        <button 
          onClick={runAudit}
          disabled={isAuditing}
          className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isAuditing ? (
             <><div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div> Auditing...</>
          ) : (
             <><ShieldAlert size={16} /> Run Diagnostic</>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
        {!results && !isAuditing && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <ShieldAlert size={48} className="mb-4 opacity-20" />
            <p>No audit results available. Run a diagnostic check to view health status.</p>
          </div>
        )}

        {isAuditing && (
          <div className="h-full flex flex-col items-center justify-center text-amber-500/50">
            <div className="w-8 h-8 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mb-4"></div>
            <p className="text-sm animate-pulse">Analyzing configurations...</p>
          </div>
        )}

        {results && (
          <div className="space-y-4">
             <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-medium">KEY NAME</th>
                    <th className="pb-3 font-medium">STATUS</th>
                    <th className="pb-3 font-medium">DIAGNOSTIC ISSUES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {results.map(result => (
                    <tr key={result.id} className="hover:bg-slate-800/20 transition-colors group">
                       <td className="py-4 font-medium">{result.name}</td>
                       <td className="py-4">
                         {result.status === 'healthy' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 size={12}/> Healthy</span>}
                         {result.status === 'warning' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><AlertTriangle size={12}/> Warning</span>}
                         {result.status === 'critical' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"><XCircle size={12}/> Critical</span>}
                       </td>
                       <td className="py-4">
                         <ul className="space-y-1">
                           {result.issues.map((issue, idx) => (
                             <li key={idx} className={`text-xs flex items-center gap-1.5 ${result.status === 'healthy' ? 'text-slate-400' : result.status === 'warning' ? 'text-amber-200' : 'text-rose-200'}`}>
                               {result.status === 'healthy' ? <CheckCircle2 size={12} className="text-emerald-500/50" /> : <AlertCircle size={12} className={result.status === 'warning' ? 'text-amber-500' : 'text-rose-500'} />}
                               {issue}
                             </li>
                           ))}
                         </ul>
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
};
