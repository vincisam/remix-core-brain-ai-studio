const fs = require('fs');
let content = fs.readFileSync('src/ai/CoreBrain.ts', 'utf-8');

const oldLruClass = `class LRUCache<K, V> {
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
}`;

const newLruClass = `class LRUCache<K, V> {
  private capacity: number;
  private ttlMs: number;
  private cache: Map<K, { value: V, expiry: number }>;

  constructor(capacity: number, ttlMs: number = 60000) { // Default 60 seconds TTL
    this.capacity = capacity;
    this.ttlMs = ttlMs;
    this.cache = new Map();
  }

  private pruneStale(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      } else {
        // Since it's an ordered Map (insertion order), if the oldest hasn't expired, the rest haven't either
        // Actually, they might have different expiries if updated, but let's just do a full scan or break early if we assume uniform TTL.
        // Doing a full scan to be safe for TTL updates.
      }
    }
  }

  get(key: K): V | undefined {
    this.pruneStale();
    if (!this.cache.has(key)) return undefined;
    const item = this.cache.get(key)!;
    
    // Update LRU position and reset TTL on access
    this.cache.delete(key);
    item.expiry = Date.now() + this.ttlMs;
    this.cache.set(key, item);
    
    return item.value;
  }

  put(key: K, value: V): void {
    this.pruneStale();
    
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, { value, expiry: Date.now() + this.ttlMs });
  }
}`;

content = content.replace(oldLruClass, newLruClass);
fs.writeFileSync('src/ai/CoreBrain.ts', content);
console.log("TTL LRU Cache Patched in CoreBrain.ts");
