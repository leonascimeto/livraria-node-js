const emprestimoEntity = require("../domain/entity/emprestimo.entity");
const { Either, AppError } = require("../shared/errors");

module.exports = function devolverLivroUseCase({ emprestimoRepository}) {
  if(!emprestimoRepository) throw new AppError(AppError.dependencies);
  return async function ({ emprestimo_id, data_devolucao }) {
    const vilidFields = emprestimo_id && data_devolucao;
    if(!vilidFields) return Either.left(AppError.fieldsObligatory);
    const {data_retorno} = await emprestimoRepository.devolver({ id: emprestimo_id, data_devolucao });
    const multa = emprestimoEntity.calcularMulta({data_retorno, data_devolucao});
    return Either.right({
      emprestimo_id,
      multa,
    });
  }
}
