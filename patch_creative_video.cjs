const fs = require('fs');
let path = 'src/components/Panels/CreativeSynthesisPanel.tsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace(
  "'a professional video generator'",
  "'Google Flow & Gemini Omni Flash AI Video'"
);

fs.writeFileSync(path, content);
console.log("Patched CreativeSynthesisPanel video instruction.");
