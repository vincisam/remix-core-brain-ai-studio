const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function testModel(model) {
  try {
    const res = await ai.models.generateContent({ model, contents: "hi" });
    console.log(model, "OK");
  } catch (err) {
    console.log(model, "FAIL", err.status || (err.message ? err.message.substring(0, 50) : err));
  }
}
async function run() {
  await testModel("gemini-3.1-flash-lite");
  await testModel("gemini-3-flash-preview");
  await testModel("gemini-2.0-flash-lite-preview-02-05");
  await testModel("gemma-4-26b-a4b-it");
  await testModel("gemini-3.6-flash");
}
run();
