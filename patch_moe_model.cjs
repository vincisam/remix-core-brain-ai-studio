const fs = require('fs');
let path = 'src/ai/MoERouter.ts';
let content = fs.readFileSync(path, 'utf-8');

// replace actualModel logic
content = content.replace(
  'const actualModel = "gemini-2.0-flash";',
  'const actualModel = (model === "gemini-1.5-pro" || model === "gemini-1.5-pro-latest" || model === "gemini-2.5-pro") ? "gemma-4-26b-a4b-it" : model;'
);

fs.writeFileSync(path, content);
console.log("Reverted MoERouter actualModel to gemma-4-26b-a4b-it since they all give errors or quota issues.");
