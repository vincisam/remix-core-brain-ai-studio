const fs = require('fs');
let path = 'src/ai/MoERouter.ts';
let content = fs.readFileSync(path, 'utf-8');

const oldStr = 'For videos, just provide a mock video link or tell the user the video pipeline has been triggered.';
const newStr = 'For videos, just provide a mock video link or tell the user the video pipeline has been triggered. You MUST mention that the video is being generated using "Google Flow & Gemini Omni Flash AI Video".';

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(path, content);
  console.log("Patched MoERouter video instruction.");
} else {
  console.log("Old string not found.");
}
