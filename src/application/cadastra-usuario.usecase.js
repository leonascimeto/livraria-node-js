module.exports = function cadastrarUsuarioUseCase({usuarioRepository}) {
  if (!usuarioRepository) throw new Error('usuarioRepository não fornecido');
   
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
