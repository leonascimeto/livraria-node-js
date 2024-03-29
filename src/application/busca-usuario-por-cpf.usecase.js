const { Either } = require("../shared/errors");

module.exports = function buscarUsuarioPorCpfUseCase({ usuarioRepository }) {
  return async function ({cpf}) {
    const usuario = await usuarioRepository.buscaUsuarioPorCpf(cpf) || null;
    return Either.right(usuario);
  } 
}
