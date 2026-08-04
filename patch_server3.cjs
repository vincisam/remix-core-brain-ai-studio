const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const wssImports = `import { WebSocketServer } from 'ws';\n`;
if (!content.includes('WebSocketServer')) {
  content = wssImports + content;
}

const originalListen = `  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server listening on http://0.0.0.0:\${PORT}\`);
  });`;

const newListen = `  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server listening on http://0.0.0.0:\${PORT}\`);
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    if (request.url === '/api/ws/chat-gateway') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    console.log('WebSocket Gateway Client Connected');
    ws.on('message', (message) => {
      console.log('ws received: %s', message);
    });
    ws.send(JSON.stringify({ type: "connection_established", engine: "WebSockets/SSE Gateway (Rust + Tokio Mock)" }));
    
    // Simulate some incoming realtime data
    const interval = setInterval(() => {
      if (ws.readyState === 1 /* ws.OPEN */) {
        ws.send(JSON.stringify({ type: "status_update", ttft: Math.floor(Math.random() * 50) }));
      }
    }, 5000);
    
    ws.on('close', () => clearInterval(interval));
  });`;

content = content.replace(originalListen, newListen);
fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with WebSocket backend");
