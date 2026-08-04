const WebSocket = require('ws');
const ws = new WebSocket('ws://127.0.0.1:3000/api/ws/chat-gateway');

ws.on('open', function open() {
  console.log('connected');
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log('received: %s', data);
  process.exit(0);
});

ws.on('error', (e) => {
    console.error('error', e);
    process.exit(1);
});

setTimeout(() => {
    console.log("Timeout");
    process.exit(1);
}, 2000);
