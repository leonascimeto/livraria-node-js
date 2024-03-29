const AppError = require("../shared/errors/AppError");

module.exports = function cadastrarUsuarioUseCase({usuarioRepository}) {
  if (!usuarioRepository) throw new AppError(AppError.dependencies);
   
  return async function ({ nome, cpf, telefone, email, endereco }) {
    await usuarioRepository.cadastrar({
      nome,
      cpf,
      telefone,
      email,
      endereco
    })
  };
}
