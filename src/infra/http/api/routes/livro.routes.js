const { Router } = require('express');
const cadastrarLivroComposer = require('../composer/cadastrar-livro.composer');
const buscarLivrosComposer = require('../composer/buscar-livro.composer');

const livroRoutes = Router();

livroRoutes.post('/', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const { statusCode, data } = await cadastrarLivroComposer(httpRequest);
  return res.status(statusCode).json(data);
});

livroRoutes.get('/', async (req, res) => {
  const httpRequest = {
    query: req.query
  }
  const { statusCode, data } = await buscarLivrosComposer(httpRequest);
  return res.status(statusCode).json(data);
});

module.exports = { livroRoutes }
