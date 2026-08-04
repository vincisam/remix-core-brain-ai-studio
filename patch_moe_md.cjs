const fs = require('fs');
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

const regex = /\[Image Generation Capabilities\][\s\S]*?Gemini Omni Flash\.\`;/m;
const replacement = `[Image Generation Capabilities]
You DO have the ability to generate images! If the user asks for an image, DO NOT apologize or say you cannot generate images. Instead, you MUST use the internal "Nano Banana 2 by Gemini" image engine.
You MUST output the image using standard Markdown syntax, exactly like this:
![Generated Image](/api/ai/image?prompt=describe_the_image_here_with_underscores_for_spaces)
(Make sure to URL encode or use underscores for spaces).
IMPORTANT: Do NOT just provide the raw URL. You MUST wrap it in the markdown image syntax.

For videos, you MUST provide a standard HTML video tag using our local OmniFlow video endpoint, exactly like this:
<video src="/api/ai/video?prompt=describe_the_video_here_with_underscores_for_spaces" controls autoPlay loop class="rounded-xl max-w-full"></video>
(Make sure to URL encode or use underscores for spaces).
IMPORTANT: Do NOT output any other text, explanation, or links. ONLY output the exact media result as described.\`;`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/ai/MoERouter.ts', content);
  console.log("Patched MoERouter media syntax");
} else {
  console.log("Could not find the target code.");
}
