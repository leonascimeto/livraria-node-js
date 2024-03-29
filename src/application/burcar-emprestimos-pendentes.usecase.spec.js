const burcarEmprestimosPendentesUsecase = require("./burcar-emprestimos-pendentes.usecase");


describe('Buscar Emprestimos Pendentes', function() {

  const emprestimoRepository = {
    buscarEmprestimosPendentes: jest.fn(),
  };

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

  test('deve buscar emprestimos pendentes', async function(){
    emprestimoRepository.buscarEmprestimosPendentes.mockResolvedValue(emprestimosPendentesMock);
    const sut = burcarEmprestimosPendentesUsecase({emprestimoRepository});
    
    const output = await sut();

    expect(output.right).toEqual(emprestimosPendentesMock);
    expect(output.right).toHaveLength(2);
    expect(emprestimoRepository.buscarEmprestimosPendentes).toHaveBeenCalledTimes(1);
  });
});
