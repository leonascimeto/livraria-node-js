const httpResponse = require("../../http-response");
const { Either, AppError } = require("../../../../shared/errors");
const emprestarLivroController = require("./emprestar-livro.controller");

describe('Emprestar Livro Controller', function() {
  const emprestarLivroUseCase = jest.fn();

  const emprestarLivroPayload = {
    livro_id: 1,
    usuario_id: 1,
    data_saida: '2024-02-16',
    data_retorno: '2024-02-23',
  };

  test('deve emprestar um livro', async function(){
    emprestarLivroUseCase.mockResolvedValue(Either.right(null));
    const httpRequest = {
      body: emprestarLivroPayload
    }

    const sut = await emprestarLivroController({ emprestarLivroUseCase, httpRequest });

    expect(sut).toEqual(httpResponse(201, null));
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      ...emprestarLivroPayload,
      data_saida: new Date(emprestarLivroPayload.data_saida),
      data_retorno: new Date(emprestarLivroPayload.data_retorno),
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar 400 se o livro não for emprestado com sucesso', async function(){
    emprestarLivroUseCase.mockResolvedValue(Either.left({ message: 'erro' }));
    const httpRequest = {
      body: emprestarLivroPayload
    }

    const sut = emprestarLivroController({ emprestarLivroUseCase, httpRequest });
    const output = await sut;

    expect(output).toEqual(httpResponse(400, 'erro'));
  });

  test('deve retornar exception se dependencias nao forem passadas', async function(){
    await expect(() => emprestarLivroController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar exception do zodValidation caso os dados estejam invalidos', async function(){
    const httpRequest = {
      body: {}
    };

    await expect(() => emprestarLivroController({ emprestarLivroUseCase, httpRequest })).rejects.toBeInstanceOf(Error);
  });
});
