const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace('  app.use("/api", moeRouter);\n  });', '  app.use("/api", moeRouter);');
fs.writeFileSync('server.ts', code);
