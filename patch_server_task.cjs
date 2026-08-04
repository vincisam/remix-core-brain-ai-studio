const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const importSwarm = 'import { swarmOrchestrator } from "./src/ai/SwarmOrchestrator";\n';
if (!content.includes('swarmOrchestrator')) {
  content = importSwarm + content;
}

const swarmCase = `        case "swarm":
          engineId = "comp-swarm-orchestrator";
          result = await swarmOrchestrator.executeSwarmTask(prompt);
          modelName = "MicroGraph Swarm";
          break;
        case "fast":
        case "nano":
          engineId = "comp-nano-banana";
          result = await nanoBananaEngine.synthesizeNano(prompt);
          modelName = "Nano Banana Sub-15ms";
          break;
`;

if (!content.includes('case "swarm":')) {
  content = content.replace(
    '        case "chat":',
    swarmCase + '        case "chat":'
  );
  fs.writeFileSync('server.ts', content);
  console.log('Patched server.ts with swarm and fast task types');
} else {
  console.log('Already patched');
}
