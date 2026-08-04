const fs = require('fs');
let content = fs.readFileSync('src/ai/NanoBananaEngine.ts', 'utf-8');

const targetRegex = /const enhancementRes = await this\.ai\.models\.generateContent\(\{[\s\S]*?\}\);/m;
const replacement = `const enhancementRes = await this.ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: [{ role: "user", parts: [{ text: \`You are an expert prompt engineer for advanced image models (like Leonardo Phoenix, Kino XL, Midjourney). Enhance the following basic prompt into a highly detailed, professional-grade, photorealistic prompt. Add details about cinematic lighting, volumetric global illumination, camera settings (e.g., 85mm lens, f/1.8 bokeh, shallow depth of field), 8k resolution, hyper-detailed textures, style, environment, and atmosphere to ensure studio-quality results. Keep it as a single descriptive paragraph. Do not add any conversational text, just output the prompt.Basic Prompt: "\${prompt}"\` }] }]
        });`;

content = content.replace(targetRegex, replacement);

const imageRegex = /const response = await this\.ai\.models\.generateImages\(\{[\s\S]*?model: 'imagen-3\.0-generate-001',[\s\S]*?prompt: engineeredPrompt,[\s\S]*?config: \{[\s\S]*?numberOfImages: 1,[\s\S]*?outputMimeType: 'image\/jpeg',[\s\S]*?aspectRatio: '1:1',[\s\S]*?\},[\s\S]*?\}\);[\s\S]*?const base64Image = response\.generatedImages\[0\]\.image\.imageBytes;/m;

const imageReplacement = `const response = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: engineeredPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        },
      });
      
      let base64Image = "";
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }`;

if (content.match(imageRegex)) {
  content = content.replace(imageRegex, imageReplacement);
  fs.writeFileSync('src/ai/NanoBananaEngine.ts', content);
  console.log("Patched NanoBananaEngine image generation successfully.");
} else {
  console.log("Could not find the target code for image generation.");
}
