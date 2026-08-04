import { GoogleGenAI } from "@google/genai";

const getAi = () => {
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
};

const run = async () => {
    const ai = getAi();
    const res = await ai.models.list();
    for await (const model of res) {
        console.log(model.name);
    }
}
run();
