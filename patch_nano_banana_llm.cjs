const fs = require('fs');
let content = fs.readFileSync('src/ai/NanoBananaEngine.ts', 'utf-8');

const regex = /  public async generateImage\(prompt: string\): Promise<Buffer> {[\s\S]*?prompt: engineeredPrompt,/;

const replacement = `  public async generateImage(prompt: string): Promise<Buffer> {
    try {
      // Leonardo.ai-style Prompt Engineering Architecture (Prompt Magic)
      // Automatically enrich the user's prompt for high-end, studio-quality, photorealistic imagery
      // We use Gemini (as the core_brain) to intelligently engineer the prompt, similar to Leonardo's Prompt Magic.
      let engineeredPrompt = prompt;
      
      try {
        console.log("[Nano Banana] Enhancing prompt via Gemini LLM...");
        const enhancementRes = await this.ai.models.generateContent({
            model: "gemini-1.5-pro",
            contents: [{ role: "user", parts: [{ text: \`You are an expert prompt engineer for advanced image models (like Leonardo Phoenix, Kino XL, Midjourney). 
Enhance the following basic prompt into a highly detailed, professional-grade, photorealistic prompt. 
Add details about cinematic lighting, volumetric global illumination, camera settings (e.g., 85mm lens, f/1.8 bokeh, shallow depth of field), 8k resolution, hyper-detailed textures, style, environment, and atmosphere to ensure studio-quality results. 
Keep it as a single descriptive paragraph. Do not add any conversational text, just output the prompt.
Basic Prompt: "\${prompt}"\` }] }]
        });
        if (enhancementRes.text) {
            engineeredPrompt = enhancementRes.text.trim();
        }
      } catch (e) {
          console.warn("Failed to enhance prompt with LLM, using fallback keyword appending.", e);
          if (prompt.length < 150) {
              engineeredPrompt = \`\${prompt}, high-end, professional-grade, photorealistic, hyper-detailed, 8k resolution, cinematic lighting, volumetric global illumination, 85mm lens, f/1.8 bokeh, shallow depth of field, studio-quality rendering\`;
          }
      }

      console.log("[Nano Banana] Original Prompt:", prompt);
      console.log("[Nano Banana] Leonardo.ai Engineered Prompt:", engineeredPrompt);

      const response = await this.ai.models.generateImages({
        model: 'imagen-3.0-generate-001',
        prompt: engineeredPrompt,`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/ai/NanoBananaEngine.ts', content);
  console.log("Patched NanoBananaEngine for LLM prompt engineering.");
} else {
  console.log("Could not find the target code.");
}
