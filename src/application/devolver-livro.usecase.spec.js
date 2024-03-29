const devolverLivroUsecase = require("./devolver-livro.usecase");

describe('Devolver Livro UseCase', function() {
  const emprestimoRepository = {
    buscarEmprestimoPorId: jest.fn(),
    devolverLivro: jest.fn(),
  };
  test('Deve devolver um livro sem multa', async () => {
    emprestimoRepository.devolverLivro.mockResolvedValue({
      data_retorno: new Date('2024-02-23'),
    });
    const payload = {
      emprestimo_id: 'id_valido',
      data_devolucao: new Date('2024-02-23'),
    };

    const sut = devolverLivroUsecase({ emprestimoRepository });
    const output = await sut(payload);

    expect(output.right).toEqual({
      emprestimo_id: 'id_valido',
      multa: 0,
    })
    expect(emprestimoRepository.devolverLivro).toHaveBeenCalledWith(payload);
    expect(emprestimoRepository.devolverLivro).toHaveBeenCalledTimes(1);
  });

  test('deve devolver um livro com multa', async () => {
    emprestimoRepository.devolverLivro.mockResolvedValue({
      data_retorno: new Date('2024-02-23'),
    });
    const payload = {
      emprestimo_id: 'id_valido',
      data_devolucao: new Date('2024-02-24'),
    };

    const sut = devolverLivroUsecase({ emprestimoRepository });
    const output = await sut(payload);

    expect(output.right).toEqual({
      emprestimo_id: 'id_valido',
      multa: 10.0,
    })
  });

})
