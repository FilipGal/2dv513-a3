const http = require('http');
const app = require('./config/app');

const server = http.createServer(app);

server.listen(process.env.PORT, serverStartListener);

function serverStartListener() {
  console.log('\x1b[1m', `Server started on port ${process.env.PORT}.`);
}
