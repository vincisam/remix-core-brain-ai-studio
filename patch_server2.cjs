const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(`coreBrain.engines.deepseek`, `coreBrain.engines.deepSeekR1`);
content = content.replace(`coreBrain.engines.deepseek`, `coreBrain.engines.deepSeekR1`);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with deepSeekR1 fix");
