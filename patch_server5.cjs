const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  `server.on('upgrade', (request, socket, head) => {`,
  `server.on('upgrade', (request, socket, head) => {
    console.log('[Upgrade Request]', request.url);`
);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with upgrade log");
