const { Router } = require('express');
const cadastrarUsuarioComposer = require('../composer/cadastrar-usuario.composer');

const usuariosRoutes = Router();

usuariosRoutes.post('/usuarios', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const { statusCode, body } = await cadastrarUsuarioComposer(httpRequest);
  return res.status(statusCode).json(body);
});