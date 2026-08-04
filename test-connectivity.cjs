const http = require('http');

const checkEndpoint = (path, method = 'GET') => {
  return new Promise((resolve) => {
    const req = http.request({ host: 'localhost', port: 3000, path: path, method, headers: { 'Content-Type': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, method, status: res.statusCode, data: data.substring(0, 200) });
      });
    });
    req.on('error', (err) => {
      resolve({ path, method, status: 'error', data: err.message });
    });
    if (method === 'POST') {
      req.write(JSON.stringify({ prompt: "Hello", messages: [] }));
    }
    req.end();
  });
};

Promise.all([
  checkEndpoint('/api/health'),
  checkEndpoint('/api/ai/chat', 'POST'),
  checkEndpoint('/api/ai/core_brain/status')
]).then(results => console.log(JSON.stringify(results, null, 2)));
