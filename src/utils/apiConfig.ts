const ENCRYPTION_KEY = "core_brain_secure_key_2026";
const xorEncryptDecrypt = (input: string) => {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
  }
  return output;
};

const getSecureItem = (key: string) => {
  if (typeof window === 'undefined') return null;
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  try {
    return xorEncryptDecrypt(atob(encrypted));
  } catch {
    return null;
  }
};

const PROVIDER_IDS = [
  'GEMINI_API_KEY', 'OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 
  'DEEPSEEK_API_KEY', 'GROQ_API_KEY', 'MISTRAL_API_KEY', 
  'DASHSCOPE_API_KEY', 'COHERE_API_KEY', 'PERPLEXITY_API_KEY', 
  'XAI_API_KEY', 'ZHIPU_API_KEY', 'STABILITY_API_KEY', 
  'TENCENT_SECRET_ID', 'TENCENT_SECRET_KEY'
];

export const getApiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  const customKeys: Record<string, string> = {};
  PROVIDER_IDS.forEach(id => {
    const val = getSecureItem(`api_key_${id}`);
    if (val) {
      customKeys[id] = val;
    }
  });
  
  if (Object.keys(customKeys).length > 0) {
    headers['X-Custom-Api-Keys'] = JSON.stringify(customKeys);
  }
  
  return headers;
};
