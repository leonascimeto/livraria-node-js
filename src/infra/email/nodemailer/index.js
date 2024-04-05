const nodemailer = require('nodemailer');
const {NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_PASS, NODEMAILER_USER} = require('../../../shared/constants');

module.exports = function nodemailerEmailService(){
  const enviarEmail = async function({
    data_saida,
    data_retorno,
    nome_usuario,
    cpf,
    email,
    titulo_livro
  })
  {
    var transport = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
      }
    });

    const data_saidaBR = new Date(data_saida).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    const data_retornoBR = new Date(data_retorno).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    await transport.sendMail({
      from: 'Biblioteca UNP <contato@unp.com>',
      to: email,
      subject: 'Emprestimo de Livro',
      text: `Olá ${nome_usuario}(${cpf}), você pegou o livro ${titulo_livro} emprestado no dia ${data_saidaBR} e deverá devolver no dia ${data_retornoBR}
      `
    });
  }

  return { enviarEmail }
}
