const { typeormServer } = require("../setup")

const typeOrmEmprestimosRepository = typeormServer.getRepository("Emprestimo")

const emprestimoRepository = function() {
  const emprestar = async function({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao }) {
    await typeOrmEmprestimosRepository.save({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao })
  }

  const devolver = async function({ id, data_devolucao }) {
    await typeOrmEmprestimosRepository.update({ id }, { data_devolucao });
    const {data_retorno} = await typeOrmEmprestimosRepository.findOneBy({ id });
    return { data_retorno }
  }

  return { emprestar, devolver }
}

module.exports = { emprestimoRepository, typeOrmEmprestimosRepository }
