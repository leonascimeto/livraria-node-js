const { typeormServer } = require("../setup")

const typeOrmEmprestimosRepository = typeormServer.getRepository("Emprestimo")

const emprestimoRepository = function() {
  const cadastrar = async function({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao }) {
    await typeOrmEmprestimosRepository.save({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao })
  }

  return { cadastrar }
}

module.exports = { emprestimoRepository, typeOrmEmprestimosRepository }
