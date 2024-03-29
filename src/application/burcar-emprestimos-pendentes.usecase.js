const { Either } = require("../shared/errors");

module.exports = function buscarEmprestimosPendentesUseCase({ emprestimoRepository }) {
  if(!emprestimoRepository) throw new AppError(AppError.dependencies);
  return async function () {
    const emprestimos = await emprestimoRepository.buscarEmprestimosPendentes() || [];
    return Either.right(emprestimos);
  }
}
