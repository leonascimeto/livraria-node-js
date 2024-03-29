const { Either, AppError } = require("../shared/errors");

module.exports = function cadastrarLivroUseCase({ livroRepository }) {
  if(!livroRepository) throw new AppError(AppError.dependencies);
  return async function ({ titulo, quantidade, autor, genero, isbn }) {
    if(!titulo || !quantidade || !autor || !genero || !isbn) 
      return Either.left(AppError.fieldsObligatory);
    if(await livroRepository.existePorIsbn(isbn)) return Either.left(AppError.isbnAlreadyRegistered);
    await livroRepository.cadastrar({
      titulo,
      autor,
      genero,
      isbn,
      quantidade,
    });
    return Either.right(null);
  };
}
