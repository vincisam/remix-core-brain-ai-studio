const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  `console.log('[Upgrade Request]', request.url);`,
  `console.log('[Upgrade Request]', request.url); fs.appendFileSync('ws_log.txt', '[Upgrade Request] ' + request.url + '\\n');`
);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with file log");
