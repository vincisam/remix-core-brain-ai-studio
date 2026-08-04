const fs = require('fs');

// 1. Patch ApiKeyManager.tsx
let managerContent = fs.readFileSync('src/components/Dashboards/ApiKeyManager.tsx', 'utf-8');
const newProviders = `const PROVIDERS = [
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
];`;
managerContent = managerContent.replace(/const PROVIDERS = \[\s*[\s\S]*?\];/, newProviders);
fs.writeFileSync('src/components/Dashboards/ApiKeyManager.tsx', managerContent);

// 2. Patch apiConfig.ts
let configContent = fs.readFileSync('src/utils/apiConfig.ts', 'utf-8');
const newProviderIds = `const PROVIDER_IDS = [
  'GEMINI_API_KEY', 'OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 
  'DEEPSEEK_API_KEY', 'GROQ_API_KEY', 'MISTRAL_API_KEY', 
  'DASHSCOPE_API_KEY', 'COHERE_API_KEY', 'PERPLEXITY_API_KEY', 
  'XAI_API_KEY', 'ZHIPU_API_KEY', 'STABILITY_API_KEY', 
  'TENCENT_SECRET_ID', 'TENCENT_SECRET_KEY'
];`;
configContent = configContent.replace(/const PROVIDER_IDS = \[\s*[\s\S]*?\];/, newProviderIds);
fs.writeFileSync('src/utils/apiConfig.ts', configContent);

// 3. Patch server.ts
let serverContent = fs.readFileSync('server.ts', 'utf-8');
const newMiddleware = `  // Dynamic API Key Injector from Secure Local Storage
  app.use((req, res, next) => {
    const keysStr = req.headers['x-custom-api-keys'];
    if (keysStr) {
      try {
        const keys = JSON.parse(keysStr);
        if (keys.COHERE_API_KEY && coreBrain.engines.cohere) (coreBrain.engines.cohere as any).apiKey = keys.COHERE_API_KEY;
        if (keys.ZHIPU_API_KEY && coreBrain.engines.zaiGlm) (coreBrain.engines.zaiGlm as any).apiKey = keys.ZHIPU_API_KEY;
        if (keys.TENCENT_SECRET_ID && coreBrain.engines.tencentHunyuan) (coreBrain.engines.tencentHunyuan as any).secretId = keys.TENCENT_SECRET_ID;
        if (keys.TENCENT_SECRET_KEY && coreBrain.engines.tencentHunyuan) (coreBrain.engines.tencentHunyuan as any).secretKey = keys.TENCENT_SECRET_KEY;
        if (keys.OPENAI_API_KEY && coreBrain.engines.gpt4o) (coreBrain.engines.gpt4o as any).apiKey = keys.OPENAI_API_KEY;
        if (keys.ANTHROPIC_API_KEY && coreBrain.engines.claude) (coreBrain.engines.claude as any).apiKey = keys.ANTHROPIC_API_KEY;
        if (keys.DEEPSEEK_API_KEY && coreBrain.engines.deepSeekR1) (coreBrain.engines.deepSeekR1 as any).apiKey = keys.DEEPSEEK_API_KEY;
        if (keys.GROQ_API_KEY && coreBrain.engines.groq) (coreBrain.engines.groq as any).apiKey = keys.GROQ_API_KEY;
        if (keys.MISTRAL_API_KEY && coreBrain.engines.mistral) (coreBrain.engines.mistral as any).apiKey = keys.MISTRAL_API_KEY;
        if (keys.DASHSCOPE_API_KEY && coreBrain.engines.qwen) (coreBrain.engines.qwen as any).apiKey = keys.DASHSCOPE_API_KEY;
        if (keys.PERPLEXITY_API_KEY && coreBrain.engines.perplexity) (coreBrain.engines.perplexity as any).apiKey = keys.PERPLEXITY_API_KEY;
        if (keys.XAI_API_KEY && coreBrain.engines.grok) (coreBrain.engines.grok as any).apiKey = keys.XAI_API_KEY;
        if (keys.STABILITY_API_KEY && coreBrain.engines.stabilityAi) (coreBrain.engines.stabilityAi as any).apiKey = keys.STABILITY_API_KEY;
        if (keys.GEMINI_API_KEY) process.env.GEMINI_API_KEY = keys.GEMINI_API_KEY;
      } catch(e) {
        console.error("Failed to parse custom api keys", e);
      }
    }
    next();
  });`;

serverContent = serverContent.replace(/\/\/ Dynamic API Key Injector from Secure Local Storage[\s\S]*?next\(\);\n  }\);/, newMiddleware);
fs.writeFileSync('server.ts', serverContent);
console.log("Patched all keys");
