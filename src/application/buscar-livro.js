const { Either } = require("../shared/errors");

module.exports = function buscarLivroUseCase({ livroRepository }) {
  return async function ({valor}) {
    const livros = await livroRepository.buscarLivro(valor) || null;
    return Either.right(livros);
  } 
}
