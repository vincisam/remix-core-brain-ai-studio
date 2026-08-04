const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  `if (request.url === '/api/ws/chat-gateway')`,
  `if (request.url && request.url.startsWith('/api/ws/chat-gateway'))`
);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with startsWith");
