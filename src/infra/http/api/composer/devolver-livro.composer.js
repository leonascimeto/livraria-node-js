const devolverLivroController = require("../controller/devolver-livro.controller");
const { emprestimoRepository } = require("../../../../infra/db/typeorm/repositories/emprestimo.repository");
const devolverLivroUseCase = require("../../../../application/devolver-livro.usecase");

module.exports = async function devolverLivroComposer(httpRequest) {
  console.log("devolverLivroComposer", httpRequest);
  const emprestimoRepositoryFn = emprestimoRepository();
  const devolverLivroUseCaseFn = devolverLivroUseCase({ emprestimoRepository: emprestimoRepositoryFn });
  const controller = await devolverLivroController({ devolverLivroUseCase: devolverLivroUseCaseFn, httpRequest });
  return controller;
}
