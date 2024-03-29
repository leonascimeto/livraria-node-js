const cadastrarLivroUsecase = require("./cadastrar-livro.usecase");

describe('Cadastra livro UseCase', () => {
  const livroRepository = {
    cadastrar: jest.fn()
  }
  test('Deve cadastrar um livro', async () => {
    const input = {
      titulo: 'livro valido',
      quantidade: 2,
      autor: 'autor valido',
      genero: 'genero valido',
      isbn: 'isbn valido',
    }

    const sut = cadastrarLivroUsecase({ livroRepository });

    const output = await sut(input);

    expect(output.right).toBeNull();
    expect(livroRepository.cadastrar).toHaveBeenCalledWith(input);
    expect(livroRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

});
