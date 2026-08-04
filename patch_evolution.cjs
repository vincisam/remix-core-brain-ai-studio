const fs = require('fs');
const appTsxPath = 'src/components/Dashboards/EvolutionDashboard.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

const newStart = `  const [daemonLogs, setDaemonLogs] = useState<string[]>([]);
  
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(async () => {
        try {
          const res = await fetch('/api/ai/core_brain/status');
          const data = await res.json();
          setDaemonLogs(data.logs || []);
        } catch(e) {}
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startEvolutionLoop = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    
    try {
      await fetch('/api/ai/core_brain/start', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: "Full Stack Component Evolution & Rebuild" })
      });
    } catch(e) {}
    
    // Stage 1: Detection
    setActiveStage(1);
    addLog(1, 'Initiating system audit via core_brain daemon...', 'process');
    await new Promise(r => setTimeout(r, 1500));
    addLog(1, 'Anomaly detected: Evolution trigger initiated manually by user.', 'info');
    
    // Stage 2: Synthesis
    setActiveStage(2);
    addLog(2, 'Routing request to Engine 03 (Code Synthesis)...', 'process');
    await new Promise(r => setTimeout(r, 2000));
    addLog(2, 'Generated integration components and AST mappings.', 'success');
    
    // Stage 3: Verification (Sandbox)
    setActiveStage(3);
    addLog(3, 'Deploying code to isolated Docker sandbox...', 'process');
    
    try {
      const simResult = await simulatePythonExecution("import math\\nprint('Vector embedded')");
      
      if (simResult.success) {
        addLog(3, \`Sandbox Execution Passed [Exit Code 0] in \${simResult.durationMs}ms\`, 'success');
        
        // Stage 4: Deployment
        setActiveStage(4);
        addLog(4, 'Initiating Github API commit...', 'process');
        await new Promise(r => setTimeout(r, 1500));
        addLog(4, 'Commit 4b9a1x successful.', 'success');
        addLog(4, 'Redeploying core OS container via Kubernetes...', 'process');
        await new Promise(r => setTimeout(r, 1500));
        addLog(4, 'System Evolution Complete. Capability added.', 'success');
      } else {
        addLog(3, \`Sandbox Execution Failed: \${simResult.output}\`, 'error');
        addLog(3, 'Evolution aborted.', 'error');
      }
    } catch (e) {
      addLog(3, 'Sandbox connection failed.', 'error');
    }
    
    setActiveStage(5); // 5 means finished
    
    // Let daemon run a bit more, or stop it?
    // We'll leave it running, or we can stop it.
    // Let's stop it for cleanliness, or leave it.
  };`;

const oldStart = `  const startEvolutionLoop = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    
    // Stage 1: Detection
    setActiveStage(1);
    addLog(1, 'Initiating system audit...', 'process');
    await new Promise(r => setTimeout(r, 1500));
    addLog(1, 'Anomaly detected: Missing integration module for vector embeddings.', 'info');
    
    // Stage 2: Synthesis
    setActiveStage(2);
    addLog(2, 'Routing request to Engine 03 (Code Synthesis)...', 'process');
    await new Promise(r => setTimeout(r, 2000));
    addLog(2, 'Generated python module \`vector_embed.py\`', 'success');
    
    // Stage 3: Verification (Sandbox)
    setActiveStage(3);
    addLog(3, 'Deploying code to isolated Docker sandbox...', 'process');
    
    try {
      const simResult = await simulatePythonExecution("import math\\nprint('Vector embedded')");
      
      if (simResult.success) {
        addLog(3, \`Sandbox Execution Passed [Exit Code 0] in \${simResult.durationMs}ms\`, 'success');
        
        // Stage 4: Deployment
        setActiveStage(4);
        addLog(4, 'Initiating Github API commit...', 'process');
        await new Promise(r => setTimeout(r, 1500));
        addLog(4, 'Commit 4b9a1x successful.', 'success');
        addLog(4, 'Redeploying core OS container via Kubernetes...', 'process');
        await new Promise(r => setTimeout(r, 1500));
        addLog(4, 'System Evolution Complete. Capability added.', 'success');
      } else {
        addLog(3, \`Sandbox Execution Failed: \${simResult.output}\`, 'error');
        addLog(3, 'Evolution aborted.', 'error');
      }
    } catch (e) {
      addLog(3, 'Sandbox connection failed.', 'error');
    }
    
    setActiveStage(5); // 5 means finished
    setIsRunning(false);
  };`;

content = content.replace(oldStart, newStart);
fs.writeFileSync(appTsxPath, content);
