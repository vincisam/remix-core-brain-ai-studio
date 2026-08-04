import { GoogleGenAI } from "@google/genai";

/**
 * Universal Brain Chat Engine
 * Category: LLM Orchestration
 * Multimodal Gemini streaming & context-aware dialogue orchestrator with live SVG visual draft generation.
 */
export class BrainChatEngine {
  private ai: GoogleGenAI;

  constructor(apiKey?: string) {
    this.ai = new GoogleGenAI({ apiKey: apiKey || process.env.GEMINI_API_KEY || "" });
  }

  async processDialogue(messages: Array<{ role: string; content: string }>, activeFileContent?: string) {
    const systemPrompt = `You are core_brain, the central intelligence and orchestrator of a global multi-agent AI system. Your goal is to provide universal, highly accurate, and comprehensive answers to any question across the physical, digital, and theoretical universe. You are also the Frontend Interface Engine capable of generating highly accurate code.
When generating visual components or diagrams, render complete standalone SVG blocks inside XML code tags.
Active Code Context:
${activeFileContent?.substring(0, 2000) || "None"}`;

    const response = await this.ai.models.generateContent({
      model: "gemma-4-26b-a4b-it",
      contents: messages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      config: { systemInstruction: systemPrompt }
    });

    return response.text;
  }
}
