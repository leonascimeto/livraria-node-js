const { Either, AppError } = require("../shared/errors");
const emprestarLivroUsecase = require("./emprestar-livro.usecase");

describe('Emprestar Livro UseCase', function() {
  const emprestimoRepository = {
    existeLivroPendenteUsuario: jest.fn(),
    quantidadeLivrosEmprestadoPorUsuario: jest.fn(),
    emprestarLivro: jest.fn(),
    buscarEmprestimoPorId: jest.fn(),
  };

  const emailService = {
    enviar: jest.fn(),
  }

  const emprestarLivroPayload = {
    livro_id: 'id_valido',
    usuario_id: 'id_valido',
    data_saida: new Date('2024-02-16'),
    data_retorno: new Date('2024-02-23'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Deve emprestar um livro', async () => {
    emprestimoRepository.emprestarLivro.mockResolvedValue('id_valido');
    emprestimoRepository.buscarEmprestimoPorId.mockResolvedValue({
      usuario: {
        nome: 'usuario',
        email: 'email',
      },
      livro: {
        titulo: 'titulo',
      }
    })
    const sut = emprestarLivroUsecase({ emprestimoRepository, emailService });
    const output = await sut(emprestarLivroPayload);

    expect(output.right).toBeNull();
    expect(emprestimoRepository.emprestarLivro).toHaveBeenCalledWith(emprestarLivroPayload);
    expect(emprestimoRepository.emprestarLivro).toHaveBeenCalledTimes(1);
    expect(emailService.enviar).toHaveBeenCalledWith({
      data_saida: emprestarLivroPayload.data_saida,
      data_retorno: emprestarLivroPayload.data_retorno,
      nome_usuario: 'usuario',
      email: 'email',
      titulo_livro: 'titulo',
    });
    expect(emailService.enviar).toHaveBeenCalledTimes(1);   
  });

  test('deve retornar error se a data de saída for maior que a data de retorno', async () => {
    const sut = emprestarLivroUsecase({ emprestimoRepository, emailService });


    const output = await sut({
      ...emprestarLivroPayload,
      data_saida: new Date('2024-02-23'),
      data_retorno: new Date('2024-02-16'),
    });

    expect(output).toEqual(Either.left(AppError.invalidDates));
  })

  test('não deve permitir que um livro seja emprestado para um usuário que já possui o livro', async () => {
        const sut = emprestarLivroUsecase({ emprestimoRepository, emailService });

    emprestimoRepository.existeLivroPendenteUsuario.mockResolvedValue(true);

    const output = await sut(emprestarLivroPayload);

    expect(output).toEqual(Either.left(AppError.livroJaEmprestado));
  });

  test('não deve permitir que um usuário pegue emprestado mais de 3 livros', async () => {
        const sut = emprestarLivroUsecase({ emprestimoRepository, emailService });

    emprestimoRepository.existeLivroPendenteUsuario.mockResolvedValue(false);
    emprestimoRepository.quantidadeLivrosEmprestadoPorUsuario.mockResolvedValue(3);

    const output = await sut(emprestarLivroPayload);

    expect(output).toEqual(Either.left(AppError.usuarioComLimiteEmprestimos));
  });

  test('deve retornar erro se o emprestimoRepository não for informado',  () => {
    expect(() => emprestarLivroUsecase({})).toThrow(new AppError(AppError.dependencies));
  });

  test('deve retornar erro se os campos obrigatórios não forem informados', async () => {
        const sut = emprestarLivroUsecase({ emprestimoRepository, emailService });

    const output = await sut({});
    expect(output).toEqual(Either.left(AppError.fieldsObligatory));
  });
 
});
