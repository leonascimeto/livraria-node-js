const { emprestimoRepository } = require("../../../db/typeorm/repositories/emprestimo.repository");
const buscarEmprestimosPendentesUseCase = require("../../../../application/burcar-emprestimos-pendentes.usecase");
const buscarEmprestimosPendentesController = require("../controller/buscar-emprestimos-pendentes.controller");

module.exports = async function buscarEmprestimosPendentesComposer() {
  const emprestimoRepositoryFn = emprestimoRepository();
  const buscarEmprestimosPendentesUseCaseFn = buscarEmprestimosPendentesUseCase({ emprestimoRepository: emprestimoRepositoryFn });
  const controller = await buscarEmprestimosPendentesController({ buscarEmprestimosPendentesUseCase: buscarEmprestimosPendentesUseCaseFn });
  return controller;
}
