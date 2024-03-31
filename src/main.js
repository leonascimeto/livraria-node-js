const httpServer = require('./infra/http/http-server');

function main() {
  const port = process.env.PORT || 3000;
  const server = httpServer();
  server.listen(port);
}

main();
