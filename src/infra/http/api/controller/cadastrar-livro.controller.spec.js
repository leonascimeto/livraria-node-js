const { ZodError } = require("zod");
const httpResponse = require("../../http-response");
const { Either, AppError } = require("../../../../shared/errors");
const cadastrarLivroController = require("./cadastrar-livro.controller");

describe('Cadastrar Livro Controller', function() {

  const cadastrarLivroUseCase = jest.fn();

  test('deve retornar 201 se o livro for cadastrado com sucesso', async function(){
    cadastrarLivroUseCase.mockResolvedValue(Either.right(null));
    const httpRequest = {
      body: {
        titulo: 'titulo',
        quantidade: 2,
        autor: 'autor',
        genero: 'genero',
        isbn: 'isbn',
      }
    }

    const sut = await cadastrarLivroController({ cadastrarLivroUseCase, httpRequest });

    expect(sut).toEqual(httpResponse(201, null));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar 400 se o livro não for cadastrado com sucesso', async function(){
    cadastrarLivroUseCase.mockResolvedValue(Either.left({ message: 'erro' }));
    const httpRequest = {
      body: {
        titulo: 'titulo',
        quantidade: 2,
        autor: 'autor',
        genero: 'genero',
        isbn: 'isbn',
      }
    }

    const sut = cadastrarLivroController({ cadastrarLivroUseCase, httpRequest });
    const output = await sut;

    expect(output).toEqual(httpResponse(400, 'erro'));
  });

  test('deve retornar exception se dependencias nao forem passadas', async function(){
    await expect(() => cadastrarLivroController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar exception do zodValidation caso os dados estejam invalidos', async function(){
    const httpRequest = {
      body: {}
    };

    await expect(() => cadastrarLivroController({ cadastrarLivroUseCase, httpRequest })).rejects.toBeInstanceOf(ZodError);
  });
});
