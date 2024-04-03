const { livroRepository } = require('../../../../infra/db/typeorm/repositories/livro.repository');
const buscarLivroUseCase = require('../../../../application/buscar-livro.usecase');
const buscarLivroController = require('../controller/buscar-livro.controller');

module.exports = async function buscarLivroComposer(httpRequest) {
  const livroRepositoryFn = livroRepository();
  const buscarLivroUseCaseFn = buscarLivroUseCase({ livroRepository: livroRepositoryFn });
  const controller = await buscarLivroController({ buscarLivroUseCase: buscarLivroUseCaseFn, httpRequest });
  return controller;
}
