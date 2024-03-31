const cadastrarUsuarioUsecase = require("../../../../application/cadastrar-usuario.usecase");
const { usuarioRepository } = require("../../../db/typeorm/repositories/usuario.repository");
const cadastrarUsuarioController = require("../../../../infra/http/api/controller/cadastrar-usuario.controller");


module.exports = async function cadastrarUsuarioComposer(httpRequest) {
  const usuarioRepositoryFn = usuarioRepository();
  const cadastrarUsuarioUseCaseFn = cadastrarUsuarioUsecase({ usuarioRepository: usuarioRepositoryFn });

  const controller = await cadastrarUsuarioController({ cadastraUsuarioUseCase: cadastrarUsuarioUseCaseFn, httpRequest});
  return controller;
}