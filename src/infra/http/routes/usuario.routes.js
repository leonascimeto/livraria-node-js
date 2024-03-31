const { Router } = require('express');
const { usuarioRepository } = require('../../db/typeorm/repositories/usuario.repository');
const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase');
const cadastrarUsuarioController = require('../../http/controller/cadastrar-usuario.controller');

const usuariosRoutes = Router();

usuariosRoutes.post('/usuarios', async (req, res) => {
  const httpRequest = {
    body: req.body
  }
  const usuarioRepositoryFn = usuarioRepository();
  const cadastrarUsuarioUseCaseFn = cadastrarUsuarioUsecase({ usuarioRepository: usuarioRepositoryFn });
  const { statusCode, body } = cadastrarUsuarioController({ cadastrarUsuarioUseCase: cadastrarUsuarioUseCaseFn, httpRequest });

  return res.status(statusCode).json(body);
});