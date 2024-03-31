const httpResponse = require("../../helpers/http.response");
const { Either, AppError } = require("../../shared/errors");
const buscarEmprestimosPendentesController = require("./buscar-emprestimos-pendentes");

describe('Buscar Emprestimos Pendentes Controller', function() {

  const emprestimosPendentesMock = [
    {
      id: 'id_valido',
      usuario: {
        nome: 'usuario',
        cpf: 'cpf',
      },
      livro: {
        titulo: 'titulo',
        data_saida: '2024-02-16',
        data_retorno: '2024-02-23',
      }
    },
    {
      id: 'id_valido2',
      usuario: {
        nome: 'usuario2',
        cpf: 'cpf2',
      },
      livro: {
        titulo: 'titulo2',
        data_saida: '2024-02-16',
        data_retorno: '2024-02-23',
      }
    }
  ]

  const buscarEmprestimosPendentesUseCase = jest.fn();

  test('deve retornar emprestimos pendentes como statusCode 200', async function(){
    buscarEmprestimosPendentesUseCase.mockResolvedValue(Either.right(emprestimosPendentesMock));
    const sut = await buscarEmprestimosPendentesController({ buscarEmprestimosPendentesUseCase });
    
    expect(sut).toEqual(httpResponse(200, emprestimosPendentesMock));
    expect(buscarEmprestimosPendentesUseCase).toHaveBeenCalledTimes(1);
  });

  test('deve retornar array vazio caso não tenha emprestimos pendentes com status 200', async function(){
    buscarEmprestimosPendentesUseCase.mockResolvedValue(Either.right([]));
    const sut = await buscarEmprestimosPendentesController({ buscarEmprestimosPendentesUseCase });

    expect(sut).toEqual(httpResponse(200, []));
  });

  test('deve retornar 400 se houver erro ao buscar emprestimos pendentes', async function(){
    buscarEmprestimosPendentesUseCase.mockResolvedValue(Either.left({ message: 'erro' }));
    const sut = buscarEmprestimosPendentesController({ buscarEmprestimosPendentesUseCase });
    const output = await sut;

    expect(output).toEqual(httpResponse(400, 'erro'));
  });

  test('deve retornar exception se dependencias nao forem passadas', async function(){
    await expect(() => buscarEmprestimosPendentesController({})).rejects.toThrow(new AppError(AppError.dependencies));
  });
  

});
