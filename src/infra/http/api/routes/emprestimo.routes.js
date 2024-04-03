const { Router } = require('express');
const emprestarLivroComposer = require('../composer/emprestar-livro.composer');

const emprestimoRoutes = Router();

emprestimoRoutes.post('/', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const { statusCode, data } = await emprestarLivroComposer(httpRequest);
  return res.status(statusCode).json(data);
});

module.exports = { emprestimoRoutes };
