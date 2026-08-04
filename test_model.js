const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
ai.models.generateContent({ model: "gemini-2.5-flash", contents: "hi" }).then(res => console.log(res.text)).catch(console.error);
