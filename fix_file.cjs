const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');

// The original file is inside `content` starting from `import { MessageSquare` at line 127
// Wait, the original `import React` is at the very top.
// So let's just extract the original file and apply the patch properly this time.

// The original file starts at `import React, { useState, useEffect, useRef } from 'react';\nimport { MessageSquare` 
// I will just read it line by line and construct it.
const lines = content.split('\n');

// The original file starts with `import { MessageSquare` at line 127, but we need the `import React...` line.
let originalFile = "import React, { useState, useEffect, useRef } from 'react';\n" + lines.slice(126).join('\n');
originalFile = originalFile.replace("};act';import", "import");

fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', originalFile);
