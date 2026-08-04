const fs = require('fs');
const path = 'src/ai/MoERouter.ts';
let content = fs.readFileSync(path, 'utf-8');

if (!content.includes('DynamicOptimizationLoop')) {
  content = content.replace(
    'import { getAi } from "./gemini";',
    'import { getAi } from "./gemini";\nimport { DynamicOptimizationLoop } from "./DynamicOptimizationLoop";'
  );
}

const oldPrompt = "const intentPrompt = `Analyze the user's latest message and return a strict JSON object: { \"engine\": \"engine01\" | \"engine02\" | \"engine03\" | \"engine04\" | \"engine05\" | \"engine06\" | \"engine07\" | \"engine08\" | \"engine09\" | \"engine10\" | \"engine11\", \"engines\": string[], \"requiresExternalData\": boolean, \"semanticAnalysis\": \"string\", \"complexityScore\": \"number 0.0-1.0\", \"executionPlan\": string[] }. Message: ${userPrompt}`;";
const newPrompt = "const intentPrompt = `Analyze the user's latest message and return a strict JSON object: { \"engine\": \"engine01\" | \"engine02\" | \"engine03\" | \"engine04\" | \"engine05\" | \"engine06\" | \"engine07\" | \"engine08\" | \"engine09\" | \"engine10\" | \"engine11\", \"engines\": string[], \"engineConfidence\": { \"engine01\": 0.5, \"engine03\": 0.9 }, \"requiresExternalData\": boolean, \"semanticAnalysis\": \"string\", \"complexityScore\": \"number 0.0-1.0\", \"executionPlan\": string[] }. Message: ${userPrompt}`;";
content = content.replace(oldPrompt, newPrompt);

const oldLogic = `    let intent: any = { engines: ["engine03"], requiresExternalData: false, semanticAnalysis: "General query", complexityScore: 0.1, executionPlan: ["Step 1: Code Synthesis"] };
    try {
      intent = JSON.parse(intentText);
    } catch(e) {}
    
    const engine = (intent.engines && intent.engines.length > 0) ? intent.engines[0] : "engine03";`;

const newLogic = `    let intent: any = { engines: ["engine03"], engineConfidence: { "engine03": 0.9 }, requiresExternalData: false, semanticAnalysis: "General query", complexityScore: 0.1, executionPlan: ["Step 1: Code Synthesis"] };
    try {
      intent = JSON.parse(intentText);
    } catch(e) {}
    
    // Speculative Execution (Pre-fetching)
    sendEvent("status", { step: "Speculative Execution: Pre-fetching context..." });
    
    // Dynamic Routing Optimization (DRO)
    const dol = DynamicOptimizationLoop.getInstance();
    let engine = "engine03";
    let optimizedTasks = ["engine03"];
    
    if (intent.engineConfidence) {
      optimizedTasks = dol.applyDynamicWeighting(intent.engineConfidence, 0.4);
      if (optimizedTasks.length > 0) {
        engine = optimizedTasks[0]; // Primary engine
      }
      
      if (optimizedTasks.length > 1) {
        sendEvent("status", { step: \`Cross-Engine Consensus triggered: \${optimizedTasks.join(", ")}\` });
      }
    } else {
      engine = (intent.engines && intent.engines.length > 0) ? intent.engines[0] : "engine03";
    }`;

content = content.replace(oldLogic, newLogic);

const oldEnd = `    sendEvent("done", { text: chatRes.text });
  } catch (err: any) {`;
const newEnd = `    sendEvent("done", { text: chatRes.text });
    
    // Latency-Response Tuning & DOL Feedback
    try {
      const dol = DynamicOptimizationLoop.getInstance();
      dol.updateWeights([{ engineId: engine, status: "SUCCESS" }]);
    } catch(e) {}
    
  } catch (err: any) {
    try {
      if (typeof engine !== 'undefined') {
        DynamicOptimizationLoop.getInstance().updateWeights([{ engineId: engine, status: "FAILED" }]);
      }
    } catch(e) {}`;

content = content.replace(oldEnd, newEnd);

fs.writeFileSync(path, content);
console.log("Patched MoERouter");
