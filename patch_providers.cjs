const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ApiKeyManager.tsx', 'utf-8');

const oldProviders = `const PROVIDERS = [
  { id: 'GEMINI_API_KEY', name: 'Gemini (Google)', placeholder: 'AIzaSy...' },
  { id: 'OPENAI_API_KEY', name: 'OpenAI', placeholder: 'sk-...' },
  { id: 'ANTHROPIC_API_KEY', name: 'Anthropic (Claude)', placeholder: 'sk-ant-...' },
  { id: 'DEEPSEEK_API_KEY', name: 'DeepSeek', placeholder: 'sk-...' },
  { id: 'GROQ_API_KEY', name: 'Groq', placeholder: 'gsk_...' },
  { id: 'MISTRAL_API_KEY', name: 'Mistral', placeholder: '...' },
];`;

const newProviders = `const PROVIDERS = [
  { id: 'GEMINI_API_KEY', name: 'Gemini (Google)', placeholder: 'AIzaSy...' },
  { id: 'OPENAI_API_KEY', name: 'OpenAI', placeholder: 'sk-...' },
  { id: 'ANTHROPIC_API_KEY', name: 'Anthropic (Claude)', placeholder: 'sk-ant-...' },
  { id: 'DEEPSEEK_API_KEY', name: 'DeepSeek', placeholder: 'sk-...' },
  { id: 'GROQ_API_KEY', name: 'Groq', placeholder: 'gsk_...' },
  { id: 'COHERE_API_KEY', name: 'Cohere', placeholder: '...' },
  { id: 'ZHIPU_API_KEY', name: 'Zhipu (ZAi)', placeholder: '...' },
  { id: 'TENCENT_SECRET_ID', name: 'Tencent Secret ID', placeholder: 'AKID...' },
  { id: 'TENCENT_SECRET_KEY', name: 'Tencent Secret Key', placeholder: '...' },
];`;

content = content.replace(oldProviders, newProviders);
fs.writeFileSync('src/components/Dashboards/ApiKeyManager.tsx', content);
console.log("Patched ApiKeyManager providers");
