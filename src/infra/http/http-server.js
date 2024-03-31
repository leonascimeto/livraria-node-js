require('express-async-errors');
const express = require('express');
const routes = require('./api/routes');
const { ZodError } = require('zod');

module.exports = function httpServer() {
  const app = express();
  app.use(express.json());
  app.use(routes);

  app.use((err, req, res, next) => {
    if (err instanceof ZodError) {
      console.log(err.flatten());
      return res.status(422).json({ message: 'Erro na validação', errors: err.flatten() });
    }
    if(process.env.NODE_ENV !== 'production') console.log(err.message || err);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  });

  const listen = (port, callback) => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } 

  return {
    app,
    listen
  }
}
