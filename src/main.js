const { typeormServer } = require('./infra/db/typeorm/setup');
const httpServer = require('./infra/http/http-server');

function main() {
  const port = process.env.PORT || 3000;
  const {app, listen} = httpServer();

  typeormServer.initialize().then(() => {
    listen(port);
  });
}

main();
