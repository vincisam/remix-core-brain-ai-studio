const fs = require('fs');
let content = fs.readFileSync('src/components/StudioDashboard.tsx', 'utf-8');

// Look for <div className="flex-1 p-6 overflow-y-auto flex flex-col md:flex-row gap-6"> 
// Let's replace the outer structure if needed, or it might be fine.
