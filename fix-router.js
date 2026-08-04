import fs from 'fs';
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

content = content.replace(/const { messages = \[\], activeFile, fileTree, selectedComponent, model = "gemma-4-26b-a4b-it" } = req.body;/g,
  `const { messages = [], activeFile, fileTree, selectedComponent, model = "gemma-4-26b-a4b-it" } = req.body;
  const actualModel = (model === "gemini-1.5-pro" || model === "gemini-1.5-pro-latest" || model === "gemini-2.5-pro") ? "gemma-4-26b-a4b-it" : model;`
);

content = content.replace(/model: "gemma-4-26b-a4b-it",/g, 'model: actualModel,');

fs.writeFileSync('src/ai/MoERouter.ts', content);
