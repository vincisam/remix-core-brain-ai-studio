const fs = require('fs');
let content = fs.readFileSync('src/ai/CoreBrain.ts', 'utf-8');

const lruClass = `
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }
}

`;

if (!content.includes('class LRUCache')) {
  content = content.replace('export class CoreBrain {', lruClass + 'export class CoreBrain {');
}

if (!content.includes('private promptCache: LRUCache')) {
  content = content.replace('private systemInstruction: string;', 'private systemInstruction: string;\n  private promptCache: LRUCache<string, UnifiedEngineResponse>;');
  content = content.replace('this.systemInstruction = baseInstruction;', 'this.systemInstruction = baseInstruction;\n    this.promptCache = new LRUCache<string, UnifiedEngineResponse>(100);');
}

const oldSynthesizeWithEngine = `  async synthesizeWithEngine(
    engineId: string,
    prompt: string,
    contextFiles?: Array<{ name: string; content: string }>
  ): Promise<UnifiedEngineResponse> {
    const startTime = performance.now();`;

const newSynthesizeWithEngine = `  async synthesizeWithEngine(
    engineId: string,
    prompt: string,
    contextFiles?: Array<{ name: string; content: string }>
  ): Promise<UnifiedEngineResponse> {
    const cacheKey = \`\${engineId}:::\${prompt}:::\${contextFiles ? JSON.stringify(contextFiles.map(f => f.name)) : ""}\`;
    const cachedResponse = this.promptCache.get(cacheKey);
    if (cachedResponse) {
      console.log(\`[CoreBrain] LRU Cache hit for engine \${engineId} (saved API overhead)\`);
      return { ...cachedResponse, timestamp: new Date().toISOString(), latencyMs: Math.round(performance.now() - performance.now()) + 1 };
    }

    const startTime = performance.now();`;

content = content.replace(oldSynthesizeWithEngine, newSynthesizeWithEngine);

const oldReturn = `    const latencyMs = Math.round(performance.now() - startTime);

    return {
      engineId,
      engineName,
      category,
      latencyMs,
      output,
      timestamp: new Date().toISOString(),
    };
  }`;

const newReturn = `    const latencyMs = Math.round(performance.now() - startTime);

    const responseObj: UnifiedEngineResponse = {
      engineId,
      engineName,
      category,
      latencyMs,
      output,
      timestamp: new Date().toISOString(),
    };
    this.promptCache.put(cacheKey, responseObj);
    return responseObj;
  }`;

content = content.replace(oldReturn, newReturn);

fs.writeFileSync('src/ai/CoreBrain.ts', content);
console.log("LRU Cache Patched in CoreBrain.ts");
