const httpServer = require('./infra/http/http-server');

function main() {
  const port = process.env.PORT || 3000;
  const {app, listen} = httpServer();
  

  listen(port);
}

main();
