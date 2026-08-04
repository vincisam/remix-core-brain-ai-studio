const fs = require('fs');
let content = fs.readFileSync('src/ai/NanoBananaEngine.ts', 'utf-8');

const generateImageRegex = /  public async generateImage\(prompt: string\): Promise<Buffer> {\n    try {\n      const response = await this\.ai\.models\.generateImages\({/g;

const replacement = `  public async generateImage(prompt: string): Promise<Buffer> {
    try {
      // Leonardo.ai-style Prompt Engineering Architecture (Prompt Magic)
      // Automatically enrich the user's prompt for high-end, studio-quality, photorealistic imagery
      const isPhotorealistic = prompt.toLowerCase().includes('photorealistic') || prompt.toLowerCase().includes('realistic') || prompt.toLowerCase().includes('photo');
      let engineeredPrompt = prompt;
      
      if (!isPhotorealistic && prompt.length < 150) {
          engineeredPrompt = \`\${prompt}, high-end, professional-grade, photorealistic, hyper-detailed, 8k resolution, cinematic lighting, volumetric global illumination, 85mm lens, f/1.8 bokeh, shallow depth of field, studio-quality rendering, Unreal Engine 5 style\`;
      }
      
      console.log("[Nano Banana] Original Prompt:", prompt);
      console.log("[Nano Banana] Leonardo.ai Engineered Prompt:", engineeredPrompt);

      const response = await this.ai.models.generateImages({
        model: 'imagen-3.0-generate-001',
        prompt: engineeredPrompt,`;

if (content.match(generateImageRegex)) {
  content = content.replace(generateImageRegex, replacement);
  fs.writeFileSync('src/ai/NanoBananaEngine.ts', content);
  console.log("Patched NanoBananaEngine for Leonardo.ai style prompt engineering.");
} else {
  console.log("Could not find the target code.");
}
