const { Either } = require("../shared/errors");

module.exports = function devolverLivroUseCase({ emprestimoRepository}) {
  return async function ({ emprestimo_id, data_devolucao }) {
    const {data_retorno} = await emprestimoRepository.devolverLivro({ emprestimo_id, data_devolucao });
    const devolucaoNoPrazo = new Date(data_devolucao).getTime() <= new Date(data_retorno).getTime();
    const multa = devolucaoNoPrazo ? 0.0 : 10.0;
    return Either.right({
      emprestimo_id,
      multa,
    });
  }
}
