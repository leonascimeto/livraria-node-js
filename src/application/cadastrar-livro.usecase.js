const { Either } = require("../shared/errors");

module.exports = function cadastrarLivroUseCase({ livroRepository }) {
  return async function ({ titulo, quantidade, autor, genero, isbn }) {
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
