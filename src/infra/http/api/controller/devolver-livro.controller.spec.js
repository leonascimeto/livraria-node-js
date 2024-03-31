const { ZodError } = require("zod");
const httpResponse = require("../http-response");
const { Either, AppError } = require("../../../shared/errors");
const devolverLivroController = require("./devolver-livro.controller");

describe('Devolver Livro Controller', () => {
  const devolverLivroUseCase = jest.fn();
  test('deve devolver livro e retornar statusCode 200', async () => {
    devolverLivroUseCase.mockResolvedValue(Either.right({
      emprestimo_id: 1,
      multa: 0,
    }));
    const httpRequest = {
      body: {
        data_devolucao: '2024-02-16',
      },
      params: {
        emprestimo_id: 1,
      },
    };

    const sut = await devolverLivroController({ devolverLivroUseCase, httpRequest });

    expect(sut).toEqual(httpResponse(200, { emprestimo_id: 1, multa: 0 }));
    expect(devolverLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar 400 se o livro não for devolvido com sucesso', async () => {
    devolverLivroUseCase.mockResolvedValue(Either.left({ message: 'erro' }));
    const httpRequest = {
      body: {
        data_devolucao: '2024-02-16',
      },
      params: {
        emprestimo_id: 1,
      },
    };

    const sut = devolverLivroController({ devolverLivroUseCase, httpRequest });
    const output = await sut;

    expect(output).toEqual(httpResponse(400, 'erro'));
  });

  test('deve retornar exception se dependencias nao forem passadas', async () => {
    await expect(() => devolverLivroController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar um erro do ZOD caso dados sejam inválidos', function(){
    const httpRequest = {
      body: {},
      params: {},
    }
    expect(() => devolverLivroController({devolverLivroUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError);
  });
});
