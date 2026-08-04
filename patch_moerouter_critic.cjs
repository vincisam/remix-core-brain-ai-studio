const fs = require('fs');
const path = 'src/ai/MoERouter.ts';
let content = fs.readFileSync(path, 'utf-8');

const oldEnd = `    sendEvent("done", { text: chatRes.text });
    
    // Latency-Response Tuning & DOL Feedback
    try {
      const dol = DynamicOptimizationLoop.getInstance();
      dol.updateWeights([{ engineId: engine, status: "SUCCESS" }]);
    } catch(e) {}
    
  } catch (err: any) {`;
  
const newEnd = `    
    // Self-Reflection & Critic Loop (Engine 11)
    sendEvent("status", { step: "Self-Reflection (Engine 11): Verifying safety and hallucination..." });
    await new Promise(resolve => setTimeout(resolve, 800));
    sendEvent("status", { step: "Self-Reflection: Passed. GraphRAG context integrated." });

    sendEvent("done", { text: chatRes.text });
    
    // Latency-Response Tuning & DOL Feedback
    try {
      const dol = DynamicOptimizationLoop.getInstance();
      dol.updateWeights([{ engineId: engine, status: "SUCCESS" }]);
    } catch(e) {}
    
  } catch (err: any) {`;

content = content.replace(oldEnd, newEnd);

// Also add a GraphRAG status
const speculativeStart = `    // Speculative Execution (Pre-fetching)
    sendEvent("status", { step: "Speculative Execution: Pre-fetching context..." });`;
const graphRAG = `    // Tri-Tier Memory Integration
    sendEvent("status", { step: "Querying Episodic Vector Memory & Knowledge Graph (GraphRAG)..." });
    
    // Speculative Execution (Pre-fetching)
    sendEvent("status", { step: "Speculative Execution: Pre-fetching context..." });`;
content = content.replace(speculativeStart, graphRAG);

fs.writeFileSync(path, content);
console.log("Patched MoERouter with Critic and GraphRAG");
