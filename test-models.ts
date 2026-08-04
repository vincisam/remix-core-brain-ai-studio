import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function getModels() {
  const response = await ai.models.list();
  for await (const m of response) {
    console.log(m.name);
  }
}
getModels().catch(console.error);
