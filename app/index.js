// Simple Node test app
const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
  res.end(`Hello from EKS CI/CD demo! Time: ${new Date()}\n`);
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
