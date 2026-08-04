const fs = require('fs');

let config = fs.readFileSync('vite.config.ts', 'utf-8');
config = config.replace(/hmr: process\.env\.DISABLE_HMR !== 'true'/g, 'hmr: false');
config = config.replace(/watch: process\.env\.DISABLE_HMR === 'true' \? null : {}/g, 'watch: null');
fs.writeFileSync('vite.config.ts', config);

let serverConfig = fs.readFileSync('server.ts', 'utf-8');
serverConfig = serverConfig.replace(/server: { middlewareMode: true },/g, 'server: { middlewareMode: true, hmr: false },');
fs.writeFileSync('server.ts', serverConfig);
