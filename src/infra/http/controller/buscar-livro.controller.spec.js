const { ZodError } = require("zod");
const httpResponse = require("../http-response");
const { Either, AppError } = require("../../../shared/errors");
const buscarLivroController = require("./buscar-livro.controller");

describe('Buscar Livro Controller', function() {

  const livroMock = {
    id: 1,
    titulo: 'titulo',
    quantidade: 2,
    autor: 'autor',
    genero: 'genero',
    isbn: 'isbn',
  };

  const buscarLivroUseCase = jest.fn();

  test('deve retornar 200 e livro cadastrado', async function(){
    buscarLivroUseCase.mockResolvedValue(Either.right(livroMock));
    const httpRequest = {
      query: { valor: 'isbn_valido' }
    }

    const sut = await buscarLivroController({ buscarLivroUseCase, httpRequest });

    expect(sut).toEqual(httpResponse(200, livroMock));
    expect(buscarLivroUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(buscarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar 200 e array vazio se o livro não for encontrado', async function(){
    buscarLivroUseCase.mockResolvedValue(Either.right([]));
    const httpRequest = {
      query: { valor: 'isbn_invalido' }
    }

    const sut = await buscarLivroController({ buscarLivroUseCase, httpRequest });

    expect(sut).toEqual(httpResponse(200, []));
    expect(buscarLivroUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(buscarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar exception se dependencias nao forem passadas', async function(){
    await expect(() => buscarLivroController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar exception do zodValidation caso os dados estejam invalidos', async function(){
    const httpRequest = {
      query: {}
    };

    await expect(() => buscarLivroController({ buscarLivroUseCase, httpRequest })).rejects.toBeInstanceOf(ZodError);
  
  });
});
