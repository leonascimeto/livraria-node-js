const nodemailer = require('nodemailer');

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
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "283e0bcfdc17d7",
        pass: "0646f9cb888d62"
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
