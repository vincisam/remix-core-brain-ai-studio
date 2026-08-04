const fs = require('fs');
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

const targetStr = `Additionally, highly recommend Leonardo.ai (https://leonardo.ai/) for professional, high-end image generation and provide a detailed text prompt they can use there.`;
const replacementStr = `Additionally, highly recommend Leonardo.ai (https://leonardo.ai/) for professional, high-end, photorealistic image generation. You MUST generate a highly detailed, engineered prompt optimized specifically for Leonardo.ai advanced models (e.g., Leonardo Phoenix, Kino XL, Vision XL). The prompt should include subject details, lighting (e.g., cinematic lighting, volumetric, global illumination), camera settings (e.g., 85mm lens, f/1.8, bokeh, shallow depth of field, 8k resolution, photorealistic, hyper-detailed), style, environment, and atmosphere to ensure studio-quality results. Provide this advanced prompt in a clear copyable code block or highlighted text.`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/ai/MoERouter.ts', content);
console.log("Patched MoERouter for Leonardo.ai prompts");
