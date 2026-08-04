const fs = require('fs');
let content = fs.readFileSync('src/controllers/brain.controller.ts', 'utf-8');

if (!content.includes("jsonwebtoken")) {
    content = "import jwt from 'jsonwebtoken';\n" + content;
}

if (!content.includes("JWT_SECRET")) {
    content = content.replace(
        'export const handleBrainRequest',
        'const JWT_SECRET = process.env.JWT_SECRET || "super_secret_core_brain_key";\n\nexport const handleBrainRequest'
    );
}

if (!content.includes("Tier checking")) {
    content = content.replace(
        'const engineOutputs = await engineDispatcher.dispatch(decisions);',
        '// Tier checking for restricted engines\n    const restrictedEngines = ["engine_04", "engine_07"];\n    const requestedRestricted = decisions.filter(d => restrictedEngines.includes(d.engine_id));\n    \n    if (requestedRestricted.length > 0) {\n      const authHeader = req.headers.authorization;\n      if (!authHeader || !authHeader.startsWith("Bearer ")) {\n        return res.status(401).json({ success: false, error: "Bearer token required for tiered access to Engines 04 and 07." });\n      }\n      const token = authHeader.split(" ")[1];\n      try {\n        jwt.verify(token, JWT_SECRET);\n      } catch (err) {\n        return res.status(403).json({ success: false, error: "Invalid or expired token for tiered access." });\n      }\n    }\n\n    const engineOutputs = await engineDispatcher.dispatch(decisions);'
    );
}

fs.writeFileSync('src/controllers/brain.controller.ts', content);

let devsecops = fs.readFileSync('src/components/Dashboards/DevSecOpsDashboard.tsx', 'utf-8');
if (devsecops.includes("PENDING")) {
    devsecops = devsecops.replace(
        '<td className="p-4"><span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs font-bold">PENDING</span></td>',
        '<td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">ACTIVE</span></td>'
    );
    fs.writeFileSync('src/components/Dashboards/DevSecOpsDashboard.tsx', devsecops);
}
