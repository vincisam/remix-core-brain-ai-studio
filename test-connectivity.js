const http = require('http');

const checkEndpoint = (path) => {
  return new Promise((resolve) => {
    http.get({ host: 'localhost', port: 3000, path: path }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, status: res.statusCode, data: data.substring(0, 100) });
      });
    }).on('error', (err) => {
      resolve({ path, status: 'error', data: err.message });
    });
  });
};

Promise.all([
  checkEndpoint('/api/health'),
  checkEndpoint('/api/ai/engines'),
  checkEndpoint('/api/ai/core_brain/status')
]).then(results => console.log(JSON.stringify(results, null, 2)));
