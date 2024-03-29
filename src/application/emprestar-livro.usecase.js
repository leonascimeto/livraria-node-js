const { AppError, Either } = require("../shared/errors");

module.exports = function emprestarLivroUseCase({ emprestimoRepository }) {
  if(!emprestimoRepository) throw new AppError(AppError.dependencies);
  return async function({livro_id, usuario_id, data_saida, data_retorno}) {
    const isValidFields = livro_id && usuario_id && data_saida && data_retorno;
    if(!isValidFields) return Either.left(AppError.fieldsObligatory);
    if(data_saida.getTime() > data_retorno.getTime()) return Either.left(AppError.invalidDates);
    const existeLivroISBNPendenteUsuario = await emprestimoRepository.existeLivroPendenteUsuario({livro_id, usuario_id});
    if(existeLivroISBNPendenteUsuario) return Either.left(AppError.livroJaEmprestado);
    const quantidadeLivrosEmprestadoPorUsuario = await emprestimoRepository.quantidadeLivrosEmprestadoPorUsuario(usuario_id);
    if(quantidadeLivrosEmprestadoPorUsuario >= 3) return Either.left(AppError.usuarioComLimiteEmprestimos);
    await emprestimoRepository.emprestarLivro({
      livro_id,
      usuario_id,
      data_saida,
      data_retorno,
    });
    return Either.right(null);
  };
}
