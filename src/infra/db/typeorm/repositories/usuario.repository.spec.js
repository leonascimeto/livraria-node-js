const { usuarioRepository, typeOrmUsuariosRepository } = require("./usuario.repository");

describe('usuario repository', function() {
  let sut;

  beforeAll(async () => {
    sut = usuarioRepository();
  });

  beforeEach(async () => {
    await typeOrmUsuariosRepository.clear();
  });

  const usuarioValido = {
    nome: 'Carlos Silva', 
    cpf: '123.456.789-00', 
    email: 'email@email', 
    endereco: 'Rua dos Alfeneiros, 4', 
    telefone: '(11) 99999-9999'
  }

  test('deve retornar void ao criar um usuario', async function () {
    const usuarioCriado = await sut.cadastrar(usuarioValido);

    expect(usuarioCriado).toBeUndefined();
  })

  test('deve retornar usuario cadastrado pelo cpf', async function () {
    await typeOrmUsuariosRepository.save(usuarioValido);
    const sut = usuarioRepository();
    const usuario = await sut.buscarPorCpf(usuarioValido.cpf);

    expect(usuario.id).toBeDefined();
    expect(usuario.nome).toBe(usuarioValido.nome);
    expect(usuario.cpf).toBe(usuarioValido.cpf);
    expect(usuario.email).toBe(usuarioValido.email);
    expect(usuario.endereco).toBe(usuarioValido.endereco);
    expect(usuario.telefone).toBe(usuarioValido.telefone);
  })

  test('deve retornar null se o usuario não for encontrado', async function () {
    const usuario = await sut.buscarPorCpf('123.456.789-00');

    expect(usuario).toBeNull();
  })
  
  test('deve retornar true se o usuario existir buscando por email', async function () {
    await typeOrmUsuariosRepository.save(usuarioValido);
    const existe = await sut.existePorEmail(usuarioValido.email);
    expect(existe).toBe(true);
  })

  test('deve retornar false se o usuario não existir buscando por email', async function () {
    const existe = await sut.existePorEmail(usuarioValido.email);
    expect(existe).toBe(false);
  })

  test('deve retornar true se o usuario existir buscando por cpf', async function () {
    await typeOrmUsuariosRepository.save(usuarioValido);
    const existe = await sut.existePorCpf(usuarioValido.cpf);
    expect(existe).toBe(true);
  })

  test('deve retornar false se o usuario não existir buscando por cpf', async function () {
    const existe = await sut.existePorCpf(usuarioValido.cpf);
    expect(existe).toBe(false);
  })

});
