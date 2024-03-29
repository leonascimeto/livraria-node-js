const { Either, AppError } = require("../shared/errors");
const buscaUsuarioPorCpfUsecase = require("./busca-usuario-por-cpf.usecase");

describe('Busca usuário por cpf UseCase', () => {
  const usuarioRepository = {
    buscaUsuarioPorCpf: jest.fn()
  };

  const usuarioMock = {
    id: 'id_valido',
    name: 'Carlos Silva',
    cpf: 'cpf_valido',
    telefone: '(11) 99999-9999',
    email: 'email@email.com',
    endereco: 'Rua dos Alfeneiros, 4'
  };

  test('Deve buscar um usuário com cpf ja cadatrado', async () => {
    const cpf = 'cpf_valido'

    const sut = buscaUsuarioPorCpfUsecase({ usuarioRepository });
    usuarioRepository.buscaUsuarioPorCpf.mockResolvedValue(usuarioMock);

    const output = await sut({ cpf });
    expect(output.right).toEqual(usuarioMock);
    expect(usuarioRepository.buscaUsuarioPorCpf).toHaveBeenCalledWith(cpf);
    expect(usuarioRepository.buscaUsuarioPorCpf).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar null se o cpf não for informado', async () => {
    const cpf = 'cpf_nao_cadastrado'

    const sut = buscaUsuarioPorCpfUsecase({ usuarioRepository });
    usuarioRepository.buscaUsuarioPorCpf.mockResolvedValue(null);
    const output = await sut({ cpf });

    expect(output.right).toBeNull();
    expect(usuarioRepository.buscaUsuarioPorCpf).toHaveBeenCalledWith(cpf);
  });

  test('deve retornar erro se o usuarioRepository não for informado',  () => {
    expect(() => buscaUsuarioPorCpfUsecase({})).toThrow(new AppError(AppError.dependencies));
  })  

  test('deve retornar erro se os campos obrigatórios não forem informados', async () => {
    const sut = buscaUsuarioPorCpfUsecase({ usuarioRepository });
    const output = await sut({cpf: null});
    expect(output).toEqual(Either.left(AppError.fieldsObligatory));
  }) 
});
