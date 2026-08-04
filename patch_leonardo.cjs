const fs = require('fs');
let path = 'src/components/Panels/CreativeSynthesisPanel.tsx';
let content = fs.readFileSync(path, 'utf-8');
content = content.replace(/Midjourney v6/g, 'Leonardo.ai');
fs.writeFileSync(path, content);

path = 'src/components/Panels/MediaBuilderPanel.tsx';
content = fs.readFileSync(path, 'utf-8');
content = content.replace(/Midjourney v6/g, 'Leonardo.ai');
fs.writeFileSync(path, content);

path = 'src/components/Dashboards/IntegrationArchitectDashboard.tsx';
content = fs.readFileSync(path, 'utf-8');
content = content.replace(/Midjourney APIs/g, 'Leonardo.ai APIs');
fs.writeFileSync(path, content);
