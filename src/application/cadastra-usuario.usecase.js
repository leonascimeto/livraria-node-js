module.exports = function cadastrarUsuarioUseCase() {
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
