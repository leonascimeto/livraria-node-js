const { usuarioRepository } = require("./usuario.repository");

describe('usuario repository', function() {
  test('deve retornar void ao criar um usuario', async function () {
    const input = {
      nome: 'Carlos Silva', 
      cpf: '123.456.789-00', 
      email: 'email@email', 
      endereco: 'Rua dos Alfeneiros, 4', 
      telefone: '(11) 99999-9999'
    }
    const sut = usuarioRepository();
    const usuarioCriado = await sut.cadastrar(input);

    const usuario = await sut.buscarPorCpf(input.cpf);

    expect(usuarioCriado).toBeUndefined();
    expect(usuario.nome).toBe(input.nome);
    expect(usuario.cpf).toBe(input.cpf);
    expect(usuario.email).toBe(input.email);
    expect(usuario.endereco).toBe(input.endereco);
    expect(usuario.telefone).toBe(input.telefone);
  })

});
