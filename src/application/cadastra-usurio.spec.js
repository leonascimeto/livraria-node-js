
const { Either } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');
const cadastrarUsuarioUseCase =  require('./cadastra-usuario.usecase');
describe('Cadastra Usuário', function() {
   const usuarioRepository = {
      cadastrar: jest.fn(),
      buscarPorCpf: jest.fn()
   };
   test('Deve cadastrar um usuário', async () => {
      const usuarioDTO = {
        name: 'Carlos Silva',
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

   test('Deve retornar erro se o usuário já estiver cadastrado', async () => {
      const usuarioDTO = {
        name: 'Carlos Silva',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999',
        email: 'email@email.com',
        endereco: 'Rua dos Alfeneiros, 4'
      }

      usuarioRepository.buscarPorCpf.mockResolvedValue(true);

      const sut = cadastrarUsuarioUseCase({usuarioRepository});
      const output = await sut(usuarioDTO);
      await expect(output).toEqual(Either.left(AppError.userAlreadyRegistered));
   });
});
