const { Router } = require('express');
const cadastrarUsuarioComposer = require('../composer/cadastrar-usuario.composer');
const buscarUsuarioPorCpfComposer = require('../composer/buscar-usuario-por-cpf.composer');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const { statusCode, data } = await cadastrarUsuarioComposer(httpRequest);
  return res.status(statusCode).json(data);
});

usuariosRoutes.get('/cpf/:cpf', async (req, res) => {
  const httpRequest = {
    params: req.params
  }
  const { statusCode, data } = await buscarUsuarioPorCpfComposer(httpRequest);
  return res.status(statusCode).json(data);
});

module.exports = { usuariosRoutes };
