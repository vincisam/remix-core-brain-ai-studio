import { GoogleGenAI } from "@google/genai";

export interface RoutingDecision {
  engine_id: string;
  refined_prompt: string;
}

export class CoreBrainRouter {
  async determineIntent(userPrompt: string): Promise<RoutingDecision[]> {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("Missing API Key");

      const ai = new GoogleGenAI({ apiKey });
      const systemPrompt = `
      You are the core_brain Router. Analyze the user prompt and return a JSON array of engines needed.
      Available Engines:
      - engine_01: Web Search/Real-time
      - engine_03: Code/Programming
      - engine_05: Image/Video/Multimodal
      - engine_09: Creative Writing
      
      Return format exactly: [{"engine_id": "string", "refined_prompt": "string"}]
      `;
      
      const res = await ai.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: [
            { role: "user", parts: [{ text: systemPrompt + "\n\nUser prompt: " + userPrompt }] }
        ],
        config: {
          responseMimeType: "application/json",
        }
      });
      return JSON.parse(res.text || "[]");
    } catch(e) {
      console.error("Router error", e);
      
      // Advanced heuristic mock routing if API quota fails
      const decisions: RoutingDecision[] = [];
      const p = userPrompt.toLowerCase();
      
      if (p.includes("image") || p.includes("picture") || p.includes("draw") || p.includes("photo")) {
        decisions.push({ engine_id: "engine_05", refined_prompt: userPrompt });
      }
      if (p.includes("search") || p.includes("news") || p.includes("find") || p.includes("lookup")) {
        decisions.push({ engine_id: "engine_01", refined_prompt: userPrompt });
      }
      if (p.includes("story") || p.includes("write") || p.includes("creative")) {
        decisions.push({ engine_id: "engine_09", refined_prompt: userPrompt });
      }
      
      if (decisions.length === 0 || p.includes("code") || p.includes("script") || p.includes("program")) {
        decisions.push({ engine_id: "engine_03", refined_prompt: userPrompt });
      }
      
      return decisions;
    }
  }
}

export const coreBrainRouter = new CoreBrainRouter();
