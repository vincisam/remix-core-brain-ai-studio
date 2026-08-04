const fs = require('fs');
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

const oldStr = `[Image Generation Capabilities]
You DO have the ability to generate images! If the user asks for an image, DO NOT apologize or say you cannot generate images. Instead, provide a DIRECT URL LINK using the Pollinations API (DO NOT output markdown image syntax like ![]()). Just output the link like this:
https://image.pollinations.ai/prompt/describe_the_image_here_with_underscores_for_spaces?width=1024&height=1024&nologo=true
Additionally, highly recommend Leonardo.ai (https://leonardo.ai/) for professional, high-end image generation and provide a detailed text prompt they can use there.
For videos, just provide a mock video link or tell the user the video pipeline has been triggered.`;

const newStr = `[Image Generation Capabilities]
You DO have the ability to generate images! If the user asks for an image, DO NOT apologize or say you cannot generate images. Instead, you MUST use the internal "Nano Banana 2 by Gemini" image engine.
Provide a DIRECT URL LINK to our local endpoint (DO NOT output markdown image syntax like ![]()). Just output the link exactly like this:
/api/ai/image?prompt=describe_the_image_here_with_underscores_for_spaces
(Make sure to URL encode or use underscores for spaces).
Also, mention that this image was generated using "Nano Banana 2 by Gemini".
Additionally, highly recommend Leonardo.ai (https://leonardo.ai/) for professional, high-end image generation and provide a detailed text prompt they can use there.
For videos, just provide a mock video link or tell the user the video pipeline has been triggered.`;

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync('src/ai/MoERouter.ts', content);
  console.log("Patched MoERouter.ts");
} else {
  console.log("Old string not found.");
}
