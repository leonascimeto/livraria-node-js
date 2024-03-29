const { AppError, Either } = require("../shared/errors");
const cadastrarLivroUsecase = require("./cadastrar-livro.usecase");

describe('Cadastra livro UseCase', () => {
  const livroRepository = {
    cadastrar: jest.fn(),
    existePorIsbn: jest.fn(), 
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

  test('Deve retornar erro se o livroRepository não for informado', () => {
    expect(() => cadastrarLivroUsecase({})).toThrow(new AppError(AppError.dependencies));
  });

  test('Deve retornar erro se os campos obrigatórios não forem informados', async () => {
    const sut = cadastrarLivroUsecase({ livroRepository });
    const output = await sut({});
    expect(output.left).toEqual(AppError.fieldsObligatory);
  });

  test('Deve retornar erro se ISBN já estiver cadastrado', async () => {
    const input = {
      titulo: 'livro valido',
      quantidade: 2,
      autor: 'autor valido',
      genero: 'genero valido',
      isbn: 'isbn valido',
    }

    livroRepository.existePorIsbn.mockResolvedValue(true);
    const sut = cadastrarLivroUsecase({ livroRepository });
    const output = await sut(input);

    expect(output).toEqual(Either.left(AppError.isbnAlreadyRegistered));
    expect(livroRepository.existePorIsbn).toHaveBeenCalledWith(input.isbn);
    expect(livroRepository.existePorIsbn).toHaveBeenCalledTimes(1);
  });

});
