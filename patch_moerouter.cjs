const fs = require('fs');
const path = 'src/ai/MoERouter.ts';
let content = fs.readFileSync(path, 'utf-8');

const oldStr = `[Image Generation Capabilities]
You DO have the ability to generate images! If the user asks for an image, DO NOT apologize or say you cannot generate images. Instead, output a Markdown image using the Pollinations API like this: ![Generated Image](https://image.pollinations.ai/prompt/describe_the_image_here_with_underscores_for_spaces?width=1024&height=1024&nologo=true)
For videos, just say that you've triggered the video generation pipeline and output a mock video player markdown or similar.`;

const newStr = `[Image Generation Capabilities]
You DO have the ability to generate images! If the user asks for an image, DO NOT apologize or say you cannot generate images. Instead, provide a DIRECT URL LINK using the Pollinations API (DO NOT output markdown image syntax like ![]()). Just output the link like this:
https://image.pollinations.ai/prompt/describe_the_image_here_with_underscores_for_spaces?width=1024&height=1024&nologo=true
For videos, just provide a mock video link or tell the user the video pipeline has been triggered.`;

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(path, content);
  console.log("Patched successfully");
} else {
  console.log("Old string not found.");
}
