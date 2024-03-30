const { typeormServer } = require("../setup");

const typeOrmLivrosRepository = typeormServer.getRepository("Livro");

const livroRepository = function () {
  const cadastrar = async function ({ autor, genero, titulo, isbn, quantidade }) {
    await typeOrmLivrosRepository.save({ autor, genero, titulo, isbn, quantidade });
  };

  const existePorIsbn = async function (isbn) {
    return await typeOrmLivrosRepository.count({ where: { isbn } }) === 0 ? false : true;
  }

  return { cadastrar, existePorIsbn };
}

module.exports = { livroRepository, typeOrmLivrosRepository };
