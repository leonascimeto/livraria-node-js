const express = require('express');

module.exports = function httpServer() {
  const app = express();
  app.use(express.json());

  const listen = (port, callback) => {
    app.listen(port, callback);
  } 

  return {
    app,
    listen
  }
}
