
const { Either } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');
const cadastrarUsuarioUseCase =  require('./cadastrar-usuario.usecase');
describe('Cadastra Usuário', function() {
   const usuarioRepository = {
      cadastrar: jest.fn(),
      existePorCpf: jest.fn(),
      existePorEmail: jest.fn()
   };
   test('Deve cadastrar um usuário', async () => {
      const usuarioDTO = {
        nome: 'Carlos Silva',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999',
        email: 'email@email.com',
        endereco: 'Rua dos Alfeneiros, 4'
      }
     
      const sut = cadastrarUsuarioUseCase({usuarioRepository});
      const out = await sut(usuarioDTO);
      expect(out.right).toBeNull();
      expect(usuarioRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
      expect(usuarioRepository.cadastrar).toHaveBeenCalledTimes(1);
   });

   test('Deve retornar erro se o UserRepository não for informado', async () => {
      expect(() => cadastrarUsuarioUseCase({})).toThrow(new AppError(AppError.dependencies));
   });

   test('Deve retornar erro se o parametros obrigatorios não for informado', async () => {
      const sut = cadastrarUsuarioUseCase({usuarioRepository});
      await expect(() => sut({})).rejects.toThrow(new AppError(AppError.fieldsObligatory));
   });

   test('Deve retornar erro se o cpf já estiver cadastrado', async () => {
      const usuarioDTO = {
        nome: 'Carlos Silva',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999',
        email: 'email@email.com',
        endereco: 'Rua dos Alfeneiros, 4'
      }

      usuarioRepository.existePorCpf.mockResolvedValue(true);

      const sut = cadastrarUsuarioUseCase({usuarioRepository});
      const output = await sut(usuarioDTO);
      await expect(output).toEqual(Either.left(AppError.userAlreadyRegistered));
   });

   test('Deve retornar erro se o email já estiver cadastrado', async () => {
    const usuarioDTO = {
      nome: 'Carlos Silva',
      cpf: '123.456.789-00',
      telefone: '(11) 99999-9999',
      email: 'email@email.com',
      endereco: 'Rua dos Alfeneiros, 4'
    }

    usuarioRepository.existePorEmail.mockResolvedValue(true);

    const sut = cadastrarUsuarioUseCase({usuarioRepository});
    const output = await sut(usuarioDTO);
    await expect(output).toEqual(Either.left(AppError.userAlreadyRegistered));
 });
});
