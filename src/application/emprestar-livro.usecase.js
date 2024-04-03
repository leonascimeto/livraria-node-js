const { AppError, Either } = require("../shared/errors");

module.exports = function emprestarLivroUseCase({ emprestimoRepository, emailService }) {
  if(!emprestimoRepository || !emailService) throw new AppError(AppError.dependencies);
  return async function({livro_id, usuario_id, data_saida, data_retorno}) {
    const isValidFields = livro_id && usuario_id && data_saida && data_retorno;
    if(!isValidFields) return Either.left(AppError.fieldsObligatory);
    if(data_saida.getTime() > data_retorno.getTime()) return Either.left(AppError.invalidDates);
    const existeLivroISBNPendenteUsuario = await emprestimoRepository.existeLivroPendenteUsuario({livro_id, usuario_id});
    if(existeLivroISBNPendenteUsuario) return Either.left(AppError.livroJaEmprestado);
    const quantidadeLivrosEmprestadoPorUsuario = await emprestimoRepository.quantidadeLivrosEmprestadoPorUsuario(usuario_id);
    if(quantidadeLivrosEmprestadoPorUsuario >= 3) return Either.left(AppError.usuarioComLimiteEmprestimos);
    const id = await emprestimoRepository.emprestar({
      livro_id,
      usuario_id,
      data_saida,
      data_retorno,
    });
    
    const {usuario, livro} = await emprestimoRepository.buscarEmprestimoPorId(id);
    await emailService.enviarEmail({
      data_saida, 
      data_retorno,
      cpf: usuario.cpf, 
      nome_usuario: usuario.nome, 
      email: usuario.email, 
      titulo_livro: livro.titulo
    });

    return Either.right(null);
  };
}
