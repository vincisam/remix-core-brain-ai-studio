const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const wssCodeRegex = /  const wss = new WebSocketServer[\s\S]*?ws\.on\('close', \(\) => clearInterval\(interval\)\);\n  }\);/g;

if (content.match(wssCodeRegex)) {
  content = content.replace(wssCodeRegex, '');
  content = content.replace(/import \{ WebSocketServer \} from 'ws';\n?/, '');
  fs.writeFileSync('server.ts', content);
  console.log('Removed backend WebSocket server code.');
} else {
  console.log('Backend WebSocket server code not found.');
}
