const fs = require('fs');
const appTsxPath = 'src/components/Dashboards/EvolutionDashboard.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

const oldEnd = `    setActiveStage(5); // 5 means finished
    
    // Let daemon run a bit more, or stop it?
    // We'll leave it running, or we can stop it.
    // Let's stop it for cleanliness, or leave it.
  };`;

const newEnd = `    setActiveStage(5); // 5 means finished
    
    setTimeout(async () => {
       setIsRunning(false);
       try {
         await fetch('/api/ai/core_brain/stop', { method: 'POST' });
       } catch(e) {}
    }, 5000);
  };`;

content = content.replace(oldEnd, newEnd);
fs.writeFileSync(appTsxPath, content);
