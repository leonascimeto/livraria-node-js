const { usuarioRepository } = require("./usuario.repository");

describe('usuario repository', function() {
  test('deve retornar void ao criar um usuario', async function () {
    const sut = usuarioRepository();
    const usuarioCriado = await sut.cadastrar({
      nome: 'Carlos Silva', 
      cpf: '123.456.789-00', 
      email: 'email@email', 
      endereco: 'Rua dos Alfeneiros, 4', 
      telefone: '(11) 99999-9999'
    });

    expect(usuarioCriado).toBeUndefined();
  })

});
