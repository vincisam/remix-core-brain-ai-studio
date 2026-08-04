const fs = require('fs');

const appTsxPath = 'src/App.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

// I will just read all buttons and convert them to a loop.

