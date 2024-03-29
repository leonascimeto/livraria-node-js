const AppError = require("../shared/errors/AppError");

module.exports = function cadastrarUsuarioUseCase({usuarioRepository}) {
  if (!usuarioRepository) throw new AppError(AppError.dependencies);

  return async function ({ name, cpf, telefone, email, endereco }) {
    if (!name || !cpf || !telefone || !email || !endereco) 
      throw new AppError(AppError.fieldsObligatory);
     
    await usuarioRepository.cadastrar({
      name,
      cpf,
      telefone,
      email,
      endereco
    })
  };
}
