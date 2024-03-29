const { Either } = require("../shared/errors");

module.exports = function devolverLivroUseCase({ emprestimoRepository}) {
  return async function ({ emprestimo_id, data_devolucao }) {
    await emprestimoRepository.devolverLivro({ emprestimo_id, data_devolucao });

    return Either.right({
      emprestimo_id,
      multa: 0.0,
    });
  }
}
