const { Like } = require("typeorm");
const { typeormServer } = require("../setup");

const typeOrmLivrosRepository = typeormServer.getRepository("Livro");

const livroRepository = function () {
  const cadastrar = async function ({ autor, genero, titulo, isbn, quantidade }) {
    await typeOrmLivrosRepository.save({ autor, genero, titulo, isbn, quantidade });
  };

  const existePorIsbn = async function (isbn) {
    return await typeOrmLivrosRepository.count({ where: { isbn } }) === 0 ? false : true;
  }

  const buscarLivro = async function (valor) {
    return await typeOrmLivrosRepository.find({
      where: [
        { titulo: Like(`%${valor}%`) },
        { isbn: valor }
      ]
    });
  } 

  return { cadastrar, existePorIsbn, buscarLivro };
}

module.exports = { livroRepository, typeOrmLivrosRepository };
