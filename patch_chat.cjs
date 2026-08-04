const fs = require('fs');
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

const oldIntentCall = `
    const intentRes = await ai.models.generateContent({
      model: actualModel,
      contents: intentPrompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const intentText = intentRes.text || "{}";
    let intent: any = { engines: ["engine03"], engineConfidence: { "engine03": 0.9 }, requiresExternalData: false, semanticAnalysis: "General query", complexityScore: 0.1, executionPlan: ["Step 1: Code Synthesis"] };
    try {
      intent = JSON.parse(intentText);
    } catch(e) {}
`;

const newIntentCall = `
    // ULTRA FAST MODE: Skip the intent generation LLM call to save time!
    let intentText = "{}";
    let intent: any = { engines: ["engine03"], engineConfidence: { "engine03": 0.9 }, requiresExternalData: false, semanticAnalysis: "Fast query", complexityScore: 0.1, executionPlan: ["Step 1: Code Synthesis"] };
    try {
      if (userPrompt.toLowerCase().includes("video")) intent.engines = ["engine05"];
      if (userPrompt.toLowerCase().includes("image")) intent.engines = ["engine05"];
    } catch(e) {}
`;

content = content.replace(oldIntentCall, newIntentCall);
fs.writeFileSync('src/ai/MoERouter.ts', content);
console.log("Patched MoERouter chat for ultra-fast intent classification");
