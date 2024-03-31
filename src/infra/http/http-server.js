const express = require('express');
const routes = require('./routes');

module.exports = function httpServer() {
  const app = express();
  app.use(express.json());
  app.use(routes);

  const listen = (port, callback) => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } 

  return {
    app,
    listen
  }
}
