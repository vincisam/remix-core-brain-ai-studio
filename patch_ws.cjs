const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');

// We will add a useWebSocket hook with exponential backoff at the top of the component.
const hookCode = `
  const [wsStatus, setWsStatus] = useState('Connecting...');
  
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 7; // Max backoff ~ 2 minutes
    
    const connectWebSocket = () => {
      try {
        // We use a local endpoint for the gateway
        ws = new WebSocket(\`\${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//\${window.location.host}/api/ws/chat-gateway\`);
        
        ws.onopen = () => {
          console.log('[ChatEngine] WebSocket Gateway Connected');
          setWsStatus('Active');
          retryCount = 0; // Reset backoff on success
        };
        
        ws.onmessage = (event) => {
          // Handle incoming realtime synthesis updates
          console.log('[ChatEngine] Gateway Message:', event.data);
        };
        
        ws.onclose = (event) => {
          console.warn(\`[ChatEngine] WebSocket Closed (\${event.code}). Reconnecting...\`);
          setWsStatus('Reconnecting...');
          handleReconnect();
        };
        
        ws.onerror = (error) => {
          console.error('[ChatEngine] WebSocket Error:', error);
          ws?.close(); // Force close to trigger onclose and backoff
        };
      } catch (err) {
        console.error('[ChatEngine] WebSocket Setup Error:', err);
        handleReconnect();
      }
    };

    const handleReconnect = () => {
      if (retryCount >= maxRetries) {
        console.error('[ChatEngine] Max WebSocket reconnection attempts reached.');
        setWsStatus('Offline');
        return;
      }
      
      // Exponential backoff formula: 2^retryCount * 1000 ms, capped at 30 seconds + jitter
      const backoffMs = Math.min(1000 * Math.pow(2, retryCount), 30000);
      const jitter = Math.random() * 1000;
      const timeout = backoffMs + jitter;
      
      console.log(\`[ChatEngine] Attempting reconnect \${retryCount + 1}/\${maxRetries} in \${Math.round(timeout)}ms...\`);
      
      reconnectTimer = setTimeout(() => {
        retryCount++;
        connectWebSocket();
      }, timeout);
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) {
        ws.onclose = null; // Prevent reconnection on intentional unmount
        ws.close();
      }
    };
  }, []);
`;

content = content.replace(`export const ChatEngineDashboard = () => {`, `export const ChatEngineDashboard = () => {\n${hookCode}`);

// Replace the status in the UI
content = content.replace(
  `{ name: 'WebSockets/SSE Gateway', tech: 'Rust + Tokio', status: 'Active' },`, 
  `{ name: 'WebSockets/SSE Gateway', tech: 'Rust + Tokio', status: wsStatus },`
);

fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', content);
console.log("Patched ChatEngineDashboard with exponential backoff WebSocket");
