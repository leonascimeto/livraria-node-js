const cadastrarUsuarioUsecase = require("../../../../application/cadastrar-usuario.usecase");
const { usuarioRepository } = require("../../../db/typeorm/repositories/usuario.repository");
const cadastrarUsuarioController = require("../controller/cadastrar-usuario.controller");

module.exports = async function cadastrarUsuarioComposer(httpRequest) {
  const httpRequest = {
    body: req.body
  }
  const usuarioRepositoryFn = usuarioRepository();
  const cadastrarUsuarioUseCaseFn = cadastrarUsuarioUsecase({ usuarioRepository: usuarioRepositoryFn });
  const controller = cadastrarUsuarioController({ cadastrarUsuarioUseCase: cadastrarUsuarioUseCaseFn, httpRequest });
  return controller;
}