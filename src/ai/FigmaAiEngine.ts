import { GoogleGenAI } from "@google/genai";

export class FigmaAiEngine {
  static async generateComponent(prompt: string) {
    return {
      status: "success",
      code: "export const FigmaComponent = () => <div>Auto-generated Figma Component</div>"
    };
  }
}

export const figmaAiEngine = new FigmaAiEngine();
