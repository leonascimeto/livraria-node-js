const { typeormServer } = require("../setup");

const typeOrmLivrosRepository = typeormServer.getRepository("Livro");

const livroRepository = function () {
  const cadastrar = async function ({ autor, genero, titulo, isbn, quantidade }) {
    await typeOrmLivrosRepository.save({ autor, genero, titulo, isbn, quantidade });
  };

  return { cadastrar };
}

module.exports = { livroRepository, typeOrmLivrosRepository };
