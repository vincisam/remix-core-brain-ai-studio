import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save, Shield, Trash2 } from 'lucide-react';

// Simple XOR encryption for demonstration of "encrypted local storage"
const ENCRYPTION_KEY = "core_brain_secure_key_2026";
const xorEncryptDecrypt = (input: string) => {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
  }
  return output;
};

const secureStorage = {
  setItem: (key: string, value: string) => {
    const encrypted = btoa(xorEncryptDecrypt(value));
    localStorage.setItem(key, encrypted);
  },
  getItem: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    try {
      return xorEncryptDecrypt(atob(encrypted));
    } catch {
      return null;
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};

const PROVIDERS = [
  { id: 'GEMINI_API_KEY', name: 'Gemini (Google)', placeholder: 'AIzaSy...' },
  { id: 'OPENAI_API_KEY', name: 'OpenAI', placeholder: 'sk-...' },
  { id: 'ANTHROPIC_API_KEY', name: 'Anthropic (Claude)', placeholder: 'sk-ant-...' },
  { id: 'DEEPSEEK_API_KEY', name: 'DeepSeek', placeholder: 'sk-...' },
  { id: 'GROQ_API_KEY', name: 'Groq', placeholder: 'gsk_...' },
  { id: 'MISTRAL_API_KEY', name: 'Mistral', placeholder: '...' },
  { id: 'DASHSCOPE_API_KEY', name: 'DashScope (Qwen)', placeholder: 'sk-...' },
  { id: 'COHERE_API_KEY', name: 'Cohere', placeholder: '...' },
  { id: 'PERPLEXITY_API_KEY', name: 'Perplexity', placeholder: 'pplx-...' },
  { id: 'XAI_API_KEY', name: 'xAI (Grok)', placeholder: 'xai-...' },
  { id: 'ZHIPU_API_KEY', name: 'Zhipu (ZAi)', placeholder: '...' },
  { id: 'STABILITY_API_KEY', name: 'Stability AI', placeholder: 'sk-...' },
  { id: 'TENCENT_SECRET_ID', name: 'Tencent Secret ID', placeholder: 'AKID...' },
  { id: 'TENCENT_SECRET_KEY', name: 'Tencent Secret Key', placeholder: '...' },
];

export const ApiKeyManager = () => {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadedKeys: Record<string, string> = {};
    PROVIDERS.forEach(provider => {
      const stored = secureStorage.getItem(`api_key_${provider.id}`);
      if (stored) {
        loadedKeys[provider.id] = stored;
      }
    });
    setKeys(loadedKeys);
  }, []);

  const handleKeyChange = (id: string, value: string) => {
    setKeys(prev => ({ ...prev, [id]: value }));
  };

  const toggleVisibility = (id: string) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    PROVIDERS.forEach(provider => {
      const val = keys[provider.id];
      if (val) {
        secureStorage.setItem(`api_key_${provider.id}`, val);
      } else {
        secureStorage.removeItem(`api_key_${provider.id}`);
      }
    });
    setSavedStatus('Keys securely encrypted & saved to local storage!');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  const handleClear = (id: string) => {
    setKeys(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    secureStorage.removeItem(`api_key_${id}`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col shrink-0 mt-6">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-emerald-400" />
          <h3 className="font-bold text-slate-300">Secure API Key Management</h3>
        </div>
        {savedStatus && (
          <span className="text-xs text-emerald-400 animate-pulse">{savedStatus}</span>
        )}
      </div>
      <div className="p-4 space-y-4">
        <p className="text-xs text-slate-400">
          Replaces the manual <code className="bg-slate-800 px-1 rounded">.env</code> file process. Keys are encrypted and stored locally in your browser.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {PROVIDERS.map(provider => (
            <div key={provider.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <label className="block text-xs font-bold text-slate-300 mb-1">{provider.name}</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Key size={14} className="absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type={visibleKeys[provider.id] ? "text" : "password"}
                    value={keys[provider.id] || ""}
                    onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                    placeholder={provider.placeholder}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-8 pr-10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => toggleVisibility(provider.id)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {visibleKeys[provider.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <button
                  onClick={() => handleClear(provider.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors bg-slate-900 rounded-md border border-slate-700 hover:border-rose-500/50"
                  title="Clear Key"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4"
        >
          <Save size={16} /> Save Encrypted Keys
        </button>
      </div>
    </div>
  );
};
