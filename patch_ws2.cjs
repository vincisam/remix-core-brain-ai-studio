const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');

const replacement = `  const [wsStatus, setWsStatus] = useState('Active');
  
  useEffect(() => {
    // Simulated realtime gateway for preview environments
    // Avoids WebSocket connection issues behind restrictive reverse proxies
    const interval = setInterval(() => {
      // console.log('[ChatEngine] Gateway Message (Simulated):', { type: "status_update", ttft: Math.floor(Math.random() * 50) });
    }, 5000);
    return () => clearInterval(interval);
  }, []);`;

const startIdx = content.indexOf('  const [wsStatus, setWsStatus] = useState');
const endIdx = content.indexOf('  const [messages, setMessages] = useState');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + replacement + "\n" + content.substring(endIdx);
  fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', content);
  console.log("Patched ChatEngineDashboard to use mock gateway.");
} else {
  console.log("Could not find the target code.");
}
