
const AppError = require('../shared/errors/AppError');
const cadastrarUsuarioUseCase =  require('./cadastra-usuario.usecase');
describe('Cadastra Usuário', function() {
   const usuarioRepository = {
      cadastrar: jest.fn()
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
      expect(out).toBeUndefined();
      expect(usuarioRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
      expect(usuarioRepository.cadastrar).toHaveBeenCalledTimes(1);
   });

   test('Deve retornar erro se o UserRepository não for informado', async () => {
      expect(() => cadastrarUsuarioUseCase({})).toThrow(new AppError(AppError.dependencies));
   });
});
