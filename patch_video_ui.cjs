const fs = require('fs');
let path = 'src/components/Panels/MediaBuilderPanel.tsx';
let content = fs.readFileSync(path, 'utf-8');
content = content.replace(
  '"Sora / Wan 2.7 / Runway Gen-3"', 
  '"Google Flow & Gemini Omni Flash AI Video"'
);
fs.writeFileSync(path, content);
