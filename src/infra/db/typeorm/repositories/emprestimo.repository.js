const { IsNull } = require("typeorm")
const { typeormServer } = require("../setup")

const typeOrmEmprestimosRepository = typeormServer.getRepository("Emprestimo")

const emprestimoRepository = function() {
  const emprestar = async function({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao }) {
    await typeOrmEmprestimosRepository.save({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao })
  }

  const devolver = async function({ id, data_devolucao }) {
    await typeOrmEmprestimosRepository.update({ id }, { data_devolucao });
    const { data_retorno } = await typeOrmEmprestimosRepository.findOneBy({ id });
    return { data_retorno }
  }

  const buscarEmprestimosPendentes = async function() {
    return await typeOrmEmprestimosRepository.find({
      where: { data_devolucao: IsNull() },
      relations: ['livro', 'usuario'],
      select: {
        id: true,
        data_saida: true,
        data_retorno: true,
        livro: {
          titulo: true,
        },
        usuario: {
          cpf: true,
          nome: true,
        },
      },
    });
  }

  const existeLivroPendenteUsuario = async function({ livro_id, usuario_id }) {
    return await typeOrmEmprestimosRepository.count({
      where: {
        livro_id,
        usuario_id,
        data_devolucao: IsNull(),
      }
    }) === 0 ? false : true;
  }

  return { emprestar, devolver, buscarEmprestimosPendentes, existeLivroPendenteUsuario }
}

module.exports = { emprestimoRepository, typeOrmEmprestimosRepository }
