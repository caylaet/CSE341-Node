const http = require('http');
const routes = require('./routes');

const server = http.createServer(route.handle);
server.listen(3000);