const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const list = await ai.models.list();
    for await (const m of list) {
        console.log(m.name);
    }
  } catch (err) {
    console.error(err);
  }
}
run();
