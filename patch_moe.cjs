const fs = require('fs');
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

const regex = /\[Image Generation Capabilities\][\s\S]*?AI Video architecture"\.`/m;
const replacement = `[Image Generation Capabilities]
You DO have the ability to generate images! If the user asks for an image, DO NOT apologize or say you cannot generate images. Instead, you MUST use the internal "Nano Banana 2 by Gemini" image engine.
Provide a DIRECT URL LINK to our local endpoint (DO NOT output markdown image syntax like ![]()). Just output the link exactly like this:
/api/ai/image?prompt=describe_the_image_here_with_underscores_for_spaces
(Make sure to URL encode or use underscores for spaces).
IMPORTANT: DO NOT output any other text, explanation, or links. ONLY output the direct URL link. Do not mention Nano Banana or Leonardo.ai.

For videos, you MUST provide a DIRECT URL LINK to our local OmniFlow video endpoint. Just output the link exactly like this:
/api/ai/video?prompt=describe_the_video_here_with_underscores_for_spaces
(Make sure to URL encode or use underscores for spaces).
IMPORTANT: DO NOT output any other text, explanation, or links. ONLY output the direct URL link. Do not mention Google Flow or Gemini Omni Flash.\`;`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/ai/MoERouter.ts', content);
  console.log("Patched MoERouter image capabilities");
} else {
  console.log("Could not find the target code.");
}
