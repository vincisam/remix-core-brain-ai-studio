const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const middleware = `
  // Dynamic API Key Injector from Secure Local Storage
  app.use((req, res, next) => {
    const keysStr = req.headers['x-custom-api-keys'];
    if (keysStr) {
      try {
        const keys = JSON.parse(keysStr);
        if (keys.COHERE_API_KEY && coreBrain.engines.cohere) {
          (coreBrain.engines.cohere as any).apiKey = keys.COHERE_API_KEY;
        }
        if (keys.ZHIPU_API_KEY && coreBrain.engines.zaiGlm) {
          (coreBrain.engines.zaiGlm as any).apiKey = keys.ZHIPU_API_KEY;
        }
        if (keys.TENCENT_SECRET_ID && coreBrain.engines.tencentHunyuan) {
          (coreBrain.engines.tencentHunyuan as any).secretId = keys.TENCENT_SECRET_ID;
        }
        if (keys.TENCENT_SECRET_KEY && coreBrain.engines.tencentHunyuan) {
          (coreBrain.engines.tencentHunyuan as any).secretKey = keys.TENCENT_SECRET_KEY;
        }
        if (keys.OPENAI_API_KEY && coreBrain.engines.gpt4o) {
          (coreBrain.engines.gpt4o as any).apiKey = keys.OPENAI_API_KEY;
        }
        if (keys.ANTHROPIC_API_KEY && coreBrain.engines.claude) {
          (coreBrain.engines.claude as any).apiKey = keys.ANTHROPIC_API_KEY;
        }
        if (keys.DEEPSEEK_API_KEY && coreBrain.engines.deepseek) {
          (coreBrain.engines.deepseek as any).apiKey = keys.DEEPSEEK_API_KEY;
        }
        if (keys.GROQ_API_KEY && coreBrain.engines.groq) {
          (coreBrain.engines.groq as any).apiKey = keys.GROQ_API_KEY;
        }
        // update process.env for gemini etc
        if (keys.GEMINI_API_KEY) {
           process.env.GEMINI_API_KEY = keys.GEMINI_API_KEY;
        }
      } catch(e) {
        console.error("Failed to parse custom api keys", e);
      }
    }
    next();
  });
`;

// Insert after app = express() or before app.get("/api/health")
content = content.replace(`const PORT = 3000;`, `const PORT = 3000;\n${middleware}`);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with API key middleware");
