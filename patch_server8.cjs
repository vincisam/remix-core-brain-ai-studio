const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  `    } else {
      socket.destroy();
    }`,
  `    }`
);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts to not destroy socket");
