const emprestarLivroUsecase = require("./emprestar-livro.usecase");

describe('Emprestar Livro UseCase', function() {
  const emprestimoRepository = {
    existeLivroISBNPendenteUsuario: jest.fn(),
    quantidadeLivrosEmprestadoPorUsuario: jest.fn(),
    emprestarLivro: jest.fn(),
  };

  const emprestarLivroPayload = {
    livro_id: 'id_valido',
    usuario_id: 'id_valido',
    data_saida: new Date('2024-02-16'),
    data_retorno: new Date('2024-02-23'),
  };

  test('Deve emprestar um livro', async () => {
    const sut = emprestarLivroUsecase({ emprestimoRepository });
    const output = await sut(emprestarLivroPayload);

    expect(output.right).toBeNull();
    expect(emprestimoRepository.emprestarLivro).toHaveBeenCalledWith(emprestarLivroPayload);
    expect(emprestimoRepository.emprestarLivro).toHaveBeenCalledTimes(1);   
  });

});
