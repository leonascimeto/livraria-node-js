const { Router } = require('express');
const cadastrarUsuarioComposer = require('../composer/cadastrar-usuario.composer');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const { statusCode, data } = await cadastrarUsuarioComposer(httpRequest);
  return res.status(statusCode).json(data);
});

module.exports = { usuariosRoutes };