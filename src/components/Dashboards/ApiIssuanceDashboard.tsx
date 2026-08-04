import React, { useState, useEffect } from 'react';
import { ApiKeyHealthAudit } from './ApiKeyHealthAudit';
import { Key, ShieldCheck, CreditCard, Webhook, Code, Cpu, Plus, Trash2, RotateCw, Eye, EyeOff, Activity, Box, FileText, Download, Check, X } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  env: 'live' | 'test';
  secret: string;
  created: string;
  lastUsed: string;
}

const defaultKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production Key',
    env: 'live',
    secret: '8f72c91b4a3e2f...a1b2c3',
    created: 'Oct 12, 2025',
    lastUsed: '2 mins ago',
  },
  {
    id: '2',
    name: 'Sandbox (Test)',
    env: 'test',
    secret: 'b4a3e2f8f72c91...c3a1b2',
    created: 'Nov 04, 2025',
    lastUsed: 'Never',
  }
];

export const ApiIssuanceDashboard = () => {
  const [activeTab, setActiveTab] = useState<"portal" | "keys" | "webhooks" | "sdks" | "openapi" | "audit">("portal");
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [keys, setKeys] = useState<ApiKey[]>(defaultKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'live' | 'test'>('live');
  const [openapiContent, setOpenapiContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      env: newKeyEnv,
      secret: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      lastUsed: 'Never',
    };
    
    setKeys([newKey, ...keys]);
    setShowCreateModal(false);
    setNewKeyName('');
    setNewKeyEnv('live');
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };
  
  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (activeTab === 'openapi' && !openapiContent) {
      // Just hardcoding it here to avoid async fetch complexities in this demo,
      // but in a real app this would fetch from /openapi.yaml or similar.
      fetch('/openapi.yaml')
        .then(res => res.text())
        .then(text => {
           // Fallback if not in public dir during dev
           if (text.startsWith('<')) {
               setOpenapiContent("openapi: 3.0.3\ninfo:\n  title: AI Platform Developer API...");
           } else {
               setOpenapiContent(text);
           }
        })
        .catch(() => setOpenapiContent("Error loading spec."));
    }
  }, [activeTab, openapiContent]);

  const handleCopySpec = () => {
    navigator.clipboard.writeText(openapiContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSpec = () => {
    const blob = new Blob([openapiContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openapi.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
          <Key size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">API Issuance & Integration</h1>
          <p className="text-sm text-slate-400">Developer Portal, API Key Management & Gateway Architecture</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveTab("portal")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'portal' ? 'text-rose-400 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Cpu size={16} /> Gateway Architecture</div>
        </button>
        <button
          onClick={() => setActiveTab("keys")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'keys' ? 'text-rose-400 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Key size={16} /> API Key Management</div>
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'audit' ? 'text-rose-400 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Activity size={16} /> Health Audit</div>
        </button>
        <button
          onClick={() => setActiveTab("webhooks")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'webhooks' ? 'text-rose-400 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Webhook size={16} /> Webhooks & Async</div>
        </button>
        <button
          onClick={() => setActiveTab("sdks")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'sdks' ? 'text-rose-400 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Box size={16} /> SDKs & Integration</div>
        </button>
        <button
          onClick={() => setActiveTab("openapi")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'openapi' ? 'text-rose-400 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><FileText size={16} /> OpenAPI Spec</div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6 min-h-0 space-y-6">
        
        {activeTab === 'portal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col min-h-0">
               <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                 <Cpu className="text-blue-400" /> Gateway & Auth Flow
               </h3>
               
               <div className="flex-1 bg-slate-950 p-6 rounded-lg border border-slate-800 flex flex-col gap-4 overflow-y-auto">
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-12 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-400">Client</div>
                   <div className="flex-1 h-px bg-slate-700 relative">
                     <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-2 text-[10px] text-slate-500">HTTPS Bearer</span>
                   </div>
                   <div className="w-24 h-16 bg-blue-500/20 border border-blue-500/50 rounded flex flex-col items-center justify-center text-blue-300 text-xs">
                     <ShieldCheck size={16} className="mb-1" />
                     API Gateway
                   </div>
                 </div>

                 <div className="flex items-center gap-4 px-12">
                   <div className="flex-1 h-12 border-l-2 border-b-2 border-slate-700 rounded-bl-lg" />
                   <div className="flex-1 h-12 border-r-2 border-b-2 border-slate-700 rounded-br-lg" />
                 </div>

                 <div className="flex justify-between px-8">
                   <div className="w-24 h-16 bg-rose-500/20 border border-rose-500/50 rounded flex flex-col items-center justify-center text-rose-300 text-[10px] text-center p-2">
                     <Key size={14} className="mb-1" />
                     Key Auth & Rate Limits
                   </div>
                   <div className="w-24 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded flex flex-col items-center justify-center text-emerald-300 text-[10px] text-center p-2">
                     <CreditCard size={14} className="mb-1" />
                     Usage Metering
                   </div>
                 </div>

                 <div className="flex items-center justify-center mt-4">
                   <div className="h-8 w-px bg-slate-700" />
                 </div>

                 <div className="mx-auto w-48 h-16 bg-indigo-500/20 border border-indigo-500/50 rounded flex flex-col items-center justify-center text-indigo-300 text-xs">
                   <Cpu size={16} className="mb-1" />
                   Core AI Service
                 </div>
               </div>
            </div>

            <div className="space-y-6 flex flex-col">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-emerald-400" /> Security Non-Negotiables
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">✓</span>
                    <span><strong>Key Hashing:</strong> Never store raw API keys. Store SHA-256 hashes for validation. Show the raw key only once upon creation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">✓</span>
                    <span><strong>Rate Limiting:</strong> Tiered token-bucket rate limiting (e.g., 60 req/min for free, 1000 req/min for pro).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">✓</span>
                    <span><strong>CORS Policy:</strong> Prevent browser-based calls from unauthorized domains. Force developers to proxy requests through their backend.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
                 <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                   <CreditCard className="text-amber-400" /> Metering & Billing
                 </h3>
                 <p className="text-sm text-slate-400 mb-4">API requests are metered per-token or per-compute-second before routing to specialized engines.</p>
                 <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-slate-400">Current Billing Cycle</span>
                     <span className="text-xs font-bold text-slate-200">$142.50</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                     <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                   </div>
                   <div className="text-[10px] text-slate-500 flex justify-between">
                     <span>4.5M Tokens used</span>
                     <span>10M Limit</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Key className="text-rose-400" /> API Keys
                   </h3>
                   <p className="text-sm text-slate-400">Manage keys for development and production environments.</p>
                 </div>
                 <button onClick={() => setShowCreateModal(true)} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                   <Plus size={16} /> Create new secret key
                 </button>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                   <thead>
                     <tr className="border-b border-slate-800 text-slate-400">
                       <th className="pb-3 font-medium">NAME</th>
                       <th className="pb-3 font-medium">SECRET KEY</th>
                       <th className="pb-3 font-medium">CREATED</th>
                       <th className="pb-3 font-medium">LAST USED</th>
                       <th className="pb-3 font-medium text-right">ACTIONS</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800/50 text-slate-300">
                     {keys.map(key => (
                       <tr key={key.id} className="hover:bg-slate-800/20 transition-colors">
                         <td className="py-4 flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${key.env === 'live' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                           {key.name}
                         </td>
                         <td className="py-4 font-mono text-xs">
                           <div className="flex items-center gap-2">
                             <span className={key.env === 'live' ? "text-slate-400" : "text-slate-500"}>sk_{key.env}_</span>
                             <span>{showKey[key.id] ? key.secret : '••••••••••••••••••••'}</span>
                             <button onClick={() => toggleKeyVisibility(key.id)} className="text-slate-500 hover:text-slate-300 p-1">
                               {showKey[key.id] ? <EyeOff size={14}/> : <Eye size={14}/>}
                             </button>
                           </div>
                         </td>
                         <td className="py-4 text-slate-400 text-xs">{key.created}</td>
                         <td className="py-4 text-slate-400 text-xs">{key.lastUsed}</td>
                         <td className="py-4 text-right">
                           <div className="flex justify-end gap-2">
                             <button className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"><RotateCw size={16}/></button>
                             <button onClick={() => handleDeleteKey(key.id)} className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"><Trash2 size={16}/></button>
                           </div>
                         </td>
                       </tr>
                     ))}
                     {keys.length === 0 && (
                       <tr>
                         <td colSpan={5} className="py-8 text-center text-slate-500">
                           No API keys found. Create one to get started.
                         </td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-bold text-slate-200 mb-2">Key Formatting</h4>
                  <p className="text-sm text-slate-400 mb-4">Keys are prefixed by environment. This helps developers prevent leaking production keys in development configs.</p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                      sk_live_&lt;hash&gt; <span className="text-slate-500">// Production requests</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                      sk_test_&lt;hash&gt; <span className="text-slate-500">// Sandbox/Mock requests</span>
                    </div>
                  </div>
               </div>
               
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-bold text-slate-200 mb-2">Key Rotation & Scopes</h4>
                  <p className="text-sm text-slate-400 mb-4">Support multiple active keys simultaneously to allow zero-downtime rotation. Implement granular OAuth-style scopes.</p>
                  <div className="flex gap-2 font-mono text-[10px]">
                     <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded">inference:read</span>
                     <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">inference:write</span>
                     <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded">webhooks:manage</span>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'webhooks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Webhook className="text-purple-400" /> Webhook Dispatcher
              </h3>
              <p className="text-sm text-slate-400 mb-6">For long-running tasks (e.g., Engine 04 proofs, deep generation), we push async events back to integrator apps rather than making them poll.</p>
              
              <div className="space-y-4">
                 <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                   <div className="flex justify-between items-center mb-2">
                     <h4 className="font-bold text-slate-200 text-sm">Endpoints</h4>
                     <button className="text-xs text-purple-400 font-medium">Add Endpoint</button>
                   </div>
                   <div className="p-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-slate-300 truncate">
                     https://api.acmecorp.com/webhooks/core-brain
                   </div>
                   <div className="mt-2 text-[10px] text-slate-500">
                     Listening to: <span className="text-emerald-400">job.completed</span>, <span className="text-rose-400">job.failed</span>
                   </div>
                 </div>

                 <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                   <h4 className="font-bold text-slate-200 text-sm mb-2">Webhook Security (HMAC)</h4>
                   <p className="text-xs text-slate-400 mb-3">Integrators verify payloads using a shared secret.</p>
                   <pre className="text-[10px] text-indigo-300 font-mono bg-slate-900 p-2 rounded">
                     {`const signature = crypto
  .createHmac('sha256', endpointSecret)
  .update(rawBody)
  .digest('hex');

if (req.headers['x-corebrain-signature'] !== signature) {
  throw new Error("Invalid Webhook Signature");
}`}
                   </pre>
                 </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col min-h-0">
               <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                 <h4 className="font-bold text-slate-200">Recent Deliveries</h4>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800 rounded-lg">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                         <span className="text-xs font-bold text-slate-200">job.completed</span>
                       </div>
                       <div className="text-[10px] text-slate-500 font-mono">job_9f8e7d6c • 200 OK</div>
                     </div>
                     <span className="text-[10px] text-slate-400">{i * 15} mins ago</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'sdks' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Box className="text-emerald-400" /> Official SDKs
              </h3>
              <p className="text-sm text-slate-400 mb-6">Wrappers around the REST API for seamless developer experience.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                   <div className="flex items-center gap-2 mb-3">
                     <Code size={18} className="text-yellow-400"/>
                     <h4 className="font-bold text-slate-200">Node.js / TypeScript</h4>
                   </div>
                   <code className="text-xs text-slate-300 font-mono bg-slate-900 p-1.5 rounded block mb-2">npm i @corebrain/node</code>
                   <p className="text-[10px] text-slate-500">Full typings for all 11 engines. Native SSE stream parsing.</p>
                 </div>
                 
                 <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                   <div className="flex items-center gap-2 mb-3">
                     <Code size={18} className="text-blue-400"/>
                     <h4 className="font-bold text-slate-200">Python</h4>
                   </div>
                   <code className="text-xs text-slate-300 font-mono bg-slate-900 p-1.5 rounded block mb-2">pip install corebrain</code>
                   <p className="text-[10px] text-slate-500">Asyncio support, Pandas integration for Engine 07.</p>
                 </div>
                 
                 <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                   <div className="flex items-center gap-2 mb-3">
                     <Code size={18} className="text-orange-400"/>
                     <h4 className="font-bold text-slate-200">Go</h4>
                   </div>
                   <code className="text-xs text-slate-300 font-mono bg-slate-900 p-1.5 rounded block mb-2">go get github.com/corebrain/go</code>
                   <p className="text-[10px] text-slate-500">High concurrency backend implementations.</p>
                 </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-slate-200 mb-4">REST API (cURL Example)</h3>
              <div className="bg-slate-950 rounded-lg border border-slate-800 p-4">
                <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
{`curl https://api.corebrain.dev/v1/completions \\
  -H "Authorization: Bearer sk_live_8f72c91b4a3e2f" \\
  -H "Content-Type: application/json" \\
  -d '{
    "intent": "Perform a structural analysis of the provided code block.",
    "stream": true,
    "engines": ["engine_03", "engine_11"]
  }'`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <ApiKeyHealthAudit />
        )}

        {activeTab === 'openapi' && (
          <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <FileText className="text-blue-400" /> OpenAPI 3.0 Specification
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopySpec}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400"/> : <FileText size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button 
                  onClick={handleDownloadSpec}
                  className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Download size={14} /> Download .yaml
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-[11px] leading-tight text-slate-300">
              <pre className="whitespace-pre-wrap">{openapiContent || "Loading specification..."}</pre>
            </div>
          </div>
        )}

        {/* Create Key Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-slate-800">
                <h3 className="font-bold text-slate-100 flex items-center gap-2">
                  <Key size={18} className="text-rose-400" />
                  Create New Secret Key
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-200">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Key Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. Mobile App - Production"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Environment</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={newKeyEnv === 'live'}
                        onChange={() => setNewKeyEnv('live')}
                        className="text-rose-500 focus:ring-rose-500 bg-slate-950 border-slate-700"
                      />
                      <span className="text-slate-300 text-sm">Live (Production)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={newKeyEnv === 'test'}
                        onChange={() => setNewKeyEnv('test')}
                        className="text-rose-500 focus:ring-rose-500 bg-slate-950 border-slate-700"
                      />
                      <span className="text-slate-300 text-sm">Test (Sandbox)</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  disabled={!newKeyName.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Key
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
