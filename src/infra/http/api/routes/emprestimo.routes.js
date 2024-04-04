const { Router } = require('express');
const emprestarLivroComposer = require('../composer/emprestar-livro.composer');
const devolverLivroComposer = require('../composer/devolver-livro.composer');
const buscarEmprestimosPendentesComposer = require('../composer/buscar-emprestimos-pendentes.composer');

const emprestimoRoutes = Router();

emprestimoRoutes.post('/', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const { statusCode, data } = await emprestarLivroComposer(httpRequest);
  return res.status(statusCode).json(data);
});

emprestimoRoutes.put('/devolver/:emprestimo_id', async (req, res) => {
  const httpRequest = {
    params: { emprestimo_id: Number(req.params.emprestimo_id) },
    body: req.body
  }
  const { statusCode, data } = await devolverLivroComposer(httpRequest);
  return res.status(statusCode).json(data);
});

emprestimoRoutes.get('/', async (req, res) => {
  const { statusCode, data } = await buscarEmprestimosPendentesComposer();
  return res.status(statusCode).json(data);
});

module.exports = { emprestimoRoutes };
