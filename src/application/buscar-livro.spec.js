const { AppError } = require('../shared/errors');
const buscarLivroUseCase = require('./buscar-livro');
describe('Buscar Livro', function() {
  const livroRepository = {
    buscarLivro: jest.fn()
  };

  const livroValido  = [{
    titulo: 'livro valido',
    quantidade: 2,
    autor: 'autor valido',
    genero: 'genero valido',
    isbn: 'isbn valido',
  }]

  test('Deve buscar um livro por titulo ou isbn', async () => {
    const input = {
      valor: 'livro valido',
    }

    livroRepository.buscarLivro.mockResolvedValue(livroValido);
    const sut = buscarLivroUseCase({ livroRepository });
    const output = await sut(input);

    expect(output.right).toEqual(livroValido);
    expect(livroRepository.buscarLivro).toHaveBeenCalledWith(input.valor);
    expect(livroRepository.buscarLivro).toHaveBeenCalledTimes(1);
  });

  test('deve retornar um array vazio se não encontrar o livro', async () => {
    const input = {
      valor: 'livro inexistente',
    }

    livroRepository.buscarLivro.mockResolvedValue([]);
    const sut = buscarLivroUseCase({ livroRepository });
    const output = await sut(input);

    expect(output.right).toEqual([]);
    expect(livroRepository.buscarLivro).toHaveBeenCalledWith(input.valor);
  })

  test('deve retornar erro se o livroRepository não for informado',  () => {
    expect(() => buscarLivroUseCase({})).toThrow(new AppError(AppError.dependencies));
  })

});
