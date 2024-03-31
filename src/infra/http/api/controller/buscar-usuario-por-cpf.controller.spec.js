const { ZodError } = require("zod");
const httpResponse = require("../../http-response");
const { Either, AppError } = require("../../../../shared/errors");
const buscarUsuarioPorCpfController = require("./buscar-usuario-por-cpf.controller");

describe('Buscar Usuario Por CPF Controller', function() {
  const buscarUsuarioPorCpfUseCase = jest.fn();

  const usuarioMock = {
    id: 'id_valido',
    name: 'Carlos Silva',
    cpf: '111.111.111-11',
    telefone: '(11) 99999-9999',
    email: 'email@email.com',
    endereco: 'Rua dos Alfeneiros, 4'
  };
  
  test('deve retornar usuario com status 200 quando o usuario for encontrado com sucesso', async function(){
    buscarUsuarioPorCpfUseCase.mockResolvedValueOnce(Either.right(usuarioMock));
    const httpRequest = {
      params: {
        cpf: '111.111.111-11',
      }
    };

    const sut = await buscarUsuarioPorCpfController({buscarUsuarioPorCpfUseCase, httpRequest});

    expect(sut).toEqual(httpResponse(200, usuarioMock));
    expect(buscarUsuarioPorCpfUseCase).toHaveBeenCalledWith(httpRequest.params);
    expect(buscarUsuarioPorCpfUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar exception se dependencias nao forem passadas', async function(){
    await expect(() => buscarUsuarioPorCpfController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar 200 e null se usuario não for encontrado', async function(){
    buscarUsuarioPorCpfUseCase.mockResolvedValueOnce(Either.right(null));
    const httpRequest = {
      params: {
        cpf: '111.111.111-11',
      }
    };

    const sut = await buscarUsuarioPorCpfController({buscarUsuarioPorCpfUseCase, httpRequest});

    expect(sut).toEqual(httpResponse(200, null));
  });

  test('deve retornar exception caso passe um cpf inválido', async function(){
    const httpRequest = {
      params: {
        cpf: '111.111.111-1',
      }
    };

    await expect(() => buscarUsuarioPorCpfController({buscarUsuarioPorCpfUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError);
  });

  test('deve retornar exception caso o cpf não seja informado', async function(){
    const httpRequest = {
      params: {}
    };

    await expect(() => buscarUsuarioPorCpfController({buscarUsuarioPorCpfUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError);
  });

});
