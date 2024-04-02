const { livroRepository } = require('../../../../infra/db/typeorm/repositories/livro.repository');
const cadastrarLivroUseCase = require('../../../../application/cadastrar-livro.usecase');
const cadastrarLivroController = require('../controller/cadastrar-livro.controller');

module.exports = async function cadastrarLivroComposer(httpRequest) {
  const livroRepositoryFn = livroRepository();
  const cadastrarLivroUseCaseFn = cadastrarLivroUseCase({livroRepository: livroRepositoryFn });
  const controller = await cadastrarLivroController({
    cadastrarLivroUseCase: cadastrarLivroUseCaseFn,
    httpRequest
  });
  return controller;
}
