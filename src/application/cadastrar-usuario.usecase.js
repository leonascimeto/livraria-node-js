const { Either, AppError } = require("../shared/errors");

module.exports = function cadastrarUsuarioUseCase({usuarioRepository}) {
  if (!usuarioRepository) throw new AppError(AppError.dependencies);

  return async function ({ nome, cpf, telefone, email, endereco }) {
    if (!nome || !cpf || !telefone || !email || !endereco) 
      throw new AppError(AppError.fieldsObligatory);

    const cpfJaCadastrado = await usuarioRepository.existePorCpf(cpf);
    if (cpfJaCadastrado) return Either.left(AppError.userAlreadyRegistered);

    const emailJaCadastrado = await usuarioRepository.existePorEmail(email);
    if (emailJaCadastrado) return Either.left(AppError.userAlreadyRegistered);
    
    await usuarioRepository.cadastrar({
      nome,
      cpf,
      telefone,
      email,
      endereco
    })

    return Either.right(null);
  };
}
