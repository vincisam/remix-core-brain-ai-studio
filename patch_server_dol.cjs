const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const injectCode = `
  app.get("/api/ai/dol/status", async (req, res) => {
    try {
      const { DynamicOptimizationLoop } = await import("./src/ai/DynamicOptimizationLoop.js");
      const dol = DynamicOptimizationLoop.getInstance();
      res.json({
        weights: dol.getWeights(),
        logs: dol.performanceLog || []
      });
    } catch(e) {
      res.json({ weights: {}, logs: [] });
    }
  });
`;

content = content.replace(
  'app.post("/api/ai/core_brain/start"',
  injectCode + '\n  app.post("/api/ai/core_brain/start"'
);

fs.writeFileSync('server.ts', content);
