const httpResponse = require("../../helpers/http.response");
const AppError = require("../../shared/errors/AppError");
const Either = require("../../shared/errors/Either");
const cadastrarUsuarioController = require("./cadastrar-usuario.controller");

describe('Cadastrar Usuario Controller', function() {
  const cadastraUsuarioUseCase = jest.fn();

  test('deve retornar 201 quando o usuario for cadastrado com sucesso', async function(){
    cadastraUsuarioUseCase.mockResolvedValueOnce(Either.right(null));
    const httpRequest = {
      body: {
        nome: 'nome',
        cpf: 'cpf',
        endereco: 'endereco',
        telefone: 'telefone',
        email: 'email@email.com',
      }
    }

    const sut = await cadastrarUsuarioController({cadastraUsuarioUseCase, httpRequest});

    expect(sut.statusCode).toBe(201);
    expect(cadastraUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastraUsuarioUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar exception se dependencias nao forem passadas', async function(){
    await expect(() => cadastrarUsuarioController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar 400 se houver erro ao cadastrar usuario', async function(){
    cadastraUsuarioUseCase.mockResolvedValueOnce(Either.left({message: 'mensagem de erro'}));
    const httpRequest = {
      body: {
        nome: 'nome',
        cpf: 'cpf',
        endereco: 'endereco',
        telefone: 'telefone',
        email: 'email',
      }
    }

    const sut = await cadastrarUsuarioController({cadastraUsuarioUseCase, httpRequest});
    
    expect(sut).toEqual(httpResponse(400, {message: 'mensagem de erro'}));
  });
});
