const { Either, AppError } = require("../shared/errors");

module.exports = function cadastrarUsuarioUseCase({usuarioRepository}) {
  if (!usuarioRepository) throw new AppError(AppError.dependencies);

  return async function ({ name, cpf, telefone, email, endereco }) {
    if (!name || !cpf || !telefone || !email || !endereco) 
      throw new AppError(AppError.fieldsObligatory);

    const usuarioJaCadastrado = await usuarioRepository.buscarPorCpf(cpf);
    if (usuarioJaCadastrado) return Either.left(AppError.userAlreadyRegistered);
     
    await usuarioRepository.cadastrar({
      name,
      cpf,
      telefone,
      email,
      endereco
    })

    return Either.right(null);
  };
}
