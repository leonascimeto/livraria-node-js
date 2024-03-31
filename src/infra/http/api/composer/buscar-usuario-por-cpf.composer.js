const buscarUsuarioPorCpfUsecase = require("../../../../application/buscar-usuario-por-cpf.usecase");
const { usuarioRepository } = require("../../../db/typeorm/repositories/usuario.repository");
const buscarUsuarioPorCpfController = require("../controller/buscar-usuario-por-cpf.controller");


module.exports = async function buscarusuarionPorCpf(httpRequest) {
  const usuarioRepositoryFn = usuarioRepository();
  const buscarUsuarioPorCpfUseCaseFn = buscarUsuarioPorCpfUsecase({ usuarioRepository: usuarioRepositoryFn });

  return await buscarUsuarioPorCpfController({ buscarUsuarioPorCpfUseCase: buscarUsuarioPorCpfUseCaseFn, httpRequest });
}
