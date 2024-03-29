
const cadastrarUsuarioUseCase =  require('./cadastra-usuario.usecase');
describe('Cadastra Usuário', function() {
   test('Deve cadastrar um usuário', async () => {
      const usuarioDTO = {
         nome: 'Carlos Silva',
         cpf: '123.456.789-00',
         telefone: '(11) 99999-9999',
         email: 'email@email.com',
         endereco: 'Rua dos Alfeneiros, 4'
      }

      const sut = cadastrarUsuarioUseCase();
      const out = await sut(usuarioDTO);
      expect(out).toEqual(usuarioDTO);
   });
});
