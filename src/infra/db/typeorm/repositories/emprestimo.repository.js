const { IsNull } = require("typeorm")
const { typeormServer } = require("../setup")

const typeOrmEmprestimosRepository = typeormServer.getRepository("Emprestimo")

const emprestimoRepository = function() {
  const emprestar = async function({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao }) {
    console.log("[start] emprestimoRepository - emprestar");
    await typeOrmEmprestimosRepository.save({ livro_id, usuario_id, data_retorno, data_saida, data_devolucao })
    console.log("[end] emprestimoRepository - emprestar");
  }

  const devolver = async function({ id, data_devolucao }) {
    console.log("[start] emprestimoRepository - devolver");
    console.log("id", id)
    console.log("data_devolucao", data_devolucao)
    await typeOrmEmprestimosRepository.update({ id }, { data_devolucao });
    const { data_retorno } = await typeOrmEmprestimosRepository.findOneBy({ id });
    console.log("[end] emprestimoRepository - devolver");
    return { data_retorno }
  }

  const buscarEmprestimosPendentes = async function() {
    console.log("[start] emprestimoRepository - buscarEmprestimosPendentes");
    const emprestimosPendentes = await typeOrmEmprestimosRepository.find({
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
    console.log("[end] emprestimoRepository - buscarEmprestimosPendentes");
    return emprestimosPendentes;
  }

  const existeLivroPendenteUsuario = async function({ livro_id, usuario_id }) {
    console.log("[start] emprestimoRepository - existeLivroPendenteUsuario");
    const exist =  await typeOrmEmprestimosRepository.count({
      where: {
        livro_id,
        usuario_id,
        data_devolucao: IsNull(),
      }
    }) === 0 ? false : true;
    console.log("[end] emprestimoRepository - existeLivroPendenteUsuario");
    return exist;
  }

  const quantidadeLivrosEmprestadoPorUsuario = async function(usuario_id) {
    console.log("[start] emprestimoRepository - quantidadeLivrosEmprestadoPorUsuario")
    const quantidadeLivrosEmprestadoUsuario = await typeOrmEmprestimosRepository.count({
      where: {
        usuario_id,
        data_devolucao: IsNull(),
      }
    });
    console.log("[end] emprestimoRepository - quantidadeLivrosEmprestadoPorUsuario");
    return quantidadeLivrosEmprestadoUsuario;
  }

  const buscarEmprestimoPorId = async function(id) {
    console.log("[start] emprestimoRepository - buscarEmprestimoPorId");
    const emprestimo = await typeOrmEmprestimosRepository.findOne({
      where: { id },
      relations: ['livro', 'usuario'],
      select: {
        id: true,
        data_saida: true,
        data_retorno: true,
        data_devolucao: true,
        livro: {
          titulo: true,
        },
        usuario: {
          cpf: true,
          nome: true,
          email: true,
        },
      },
     });
    console.log("[end] emprestimoRepository - buscarEmprestimoPorId");
    return emprestimo;
  }

  return { emprestar, devolver, buscarEmprestimosPendentes, existeLivroPendenteUsuario, quantidadeLivrosEmprestadoPorUsuario, buscarEmprestimoPorId }
}

module.exports = { emprestimoRepository, typeOrmEmprestimosRepository }
