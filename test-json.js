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
    try {
        const res = await ai.models.generateContent({
            model: "gemma-4-26b-a4b-it",
            contents: "Return { \"status\": \"ok\" }",
            config: {
                responseMimeType: "application/json",
            }
        });
        console.log(res.text);
    } catch(e) {
        console.error(e.message);
    }
}
run();
