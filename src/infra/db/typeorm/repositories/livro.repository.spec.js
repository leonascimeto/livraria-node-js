const { livroRepository, typeOrmLivrosRepository } = require("./livro.repository");

describe('Livro Repository Typeorm', function() {
  let sut;

  beforeAll(() => {
    sut = livroRepository();
  });

  beforeEach(async () => {
    await typeOrmLivrosRepository.clear();
  });

  const livro = {
    titulo: 'titulo',
    quantidade: 2,
    autor: 'autor',
    genero: 'genero',
    isbn: 'isbn',
  }
  test('deve retornar void ao criar um livro', async function () {
    const livroCriado = await sut.cadastrar(livro);
    expect(livroCriado).toBeUndefined();
  });

  test('deve retorn true se exisitir livro por isbn', async function () {
    await typeOrmLivrosRepository.save(livro);
    const existe = await sut.existePorIsbn(livro.isbn);
    expect(existe).toBe(true);
  });

  test('deve retornar false se não existir livro por isbn', async function () {
    const existe = await sut.existePorIsbn(livro.isbn);
    expect(existe).toBe(false);
  });
  
});
