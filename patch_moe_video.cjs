const fs = require('fs');
let content = fs.readFileSync('src/ai/MoERouter.ts', 'utf-8');

const oldStr = 'For videos, just provide a mock video link or tell the user the video pipeline has been triggered. You MUST mention that the video is being generated using "Google Flow & Gemini Omni Flash AI Video".';

const newStr = 'For videos, you MUST provide a DIRECT URL LINK to our local OmniFlow video endpoint. Just output the link exactly like this:\n/api/ai/video?prompt=describe_the_video_here_with_underscores_for_spaces\n(Make sure to URL encode or use underscores for spaces).\nYou MUST mention that the video is being generated using "Google Flow & Gemini Omni Flash AI Video architecture".';

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync('src/ai/MoERouter.ts', content);
  console.log('Patched MoERouter video instruction.');
} else {
  console.log('Old string not found.');
}
