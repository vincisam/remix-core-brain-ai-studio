const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const imageRoute = `
  app.get("/api/ai/image", async (req, res) => {
    try {
      const prompt = req.query.prompt as string;
      if (!prompt) return res.status(400).send("Prompt is required");
      
      const imageBuffer = await nanoBananaEngine.generateImage(prompt);
      res.setHeader("Content-Type", "image/jpeg");
      res.send(imageBuffer);
    } catch (err: any) {
      console.error(err);
      // Fallback redirect if generation fails
      res.redirect(\`https://image.pollinations.ai/prompt/\${encodeURIComponent(req.query.prompt as string)}?nologo=true\`);
    }
  });
`;

content = content.replace(
  'app.post("/api/ai/core_brain/start"',
  imageRoute + '\n  app.post("/api/ai/core_brain/start"'
);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with image route");
