import { GoogleGenAI } from "@google/genai";

export class BaseEngine {
  engineId: string;
  systemPrompt: string;
  
  constructor(engineId: string, systemPrompt: string) {
    this.engineId = engineId;
    this.systemPrompt = systemPrompt;
  }
  
  async execute(prompt: string): Promise<string> {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("Missing API Key");
      
      const ai = new GoogleGenAI({ apiKey });
      const res = await ai.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: [
            { role: "user", parts: [{ text: this.systemPrompt + "\n\nTask: " + prompt }] }
        ]
      });
      return res.text || "";
    } catch(e: any) {
      const reason = e?.message || String(e);
      console.error(`Engine ${this.engineId} error:`, e);

      // Surface the real failure instead of silently faking a successful response —
      // fake "mock" output makes real problems (bad key, no billing, wrong model,
      // rate limit) invisible in the UI. This makes it visible so it's fixable.
      return `⚠️ **${this.engineId} failed to reach Gemini.**\n\n\`\`\`\n${reason}\n\`\`\`\n\nCommon causes: missing/invalid \`GEMINI_API_KEY\`, no billing enabled on the linked Google Cloud project, the model is unavailable on your tier, or a network/firewall block. Check your server terminal for the full stack trace.`;
    }
  }
}