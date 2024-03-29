const { Either, AppError } = require("../shared/errors");

module.exports = function buscarLivroUseCase({ livroRepository }) {
  if(!livroRepository) throw new AppError(AppError.dependencies);
  return async function ({valor}) {
    const livros = await livroRepository.buscarLivro(valor) || [];
    return Either.right(livros);
  } 
}
