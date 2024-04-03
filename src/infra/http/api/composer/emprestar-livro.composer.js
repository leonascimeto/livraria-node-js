const { emprestimoRepository } = require('../../../../infra/db/typeorm/repositories/emprestimo.repository');
const emprestarLivroUseCase = require('../../../../application/emprestar-livro.usecase');
const emprestarLivroController = require('../controller/emprestar-livro.controller');
const nodemailerService = require('../../../../infra/email/nodemailer');

module.exports = async function emprestarLivroComposer(httpRequest) {
  const emprestimoRepositoryFn = emprestimoRepository();
  const emailServiceFn = nodemailerService();
  const emprestarLivroUseCaseFn = emprestarLivroUseCase({ 
    emprestimoRepository: emprestimoRepositoryFn, emailService: emailServiceFn});
  const controller = await emprestarLivroController({ emprestarLivroUseCase: emprestarLivroUseCaseFn, httpRequest });
  return controller;
}
