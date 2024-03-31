const request = require('supertest');
const httpServer = require('../../http-server');
const { typeOrmUsuariosRepository } = require('../../../db/typeorm/repositories/usuario.repository');

describe('Usuario Routes', function() {
  const { app } = httpServer();

  const usuarioDTO = {
    nome: 'Carlos Silva',
    cpf: '123.456.789-00',
    telefone: '(11) 99999-9999',
    email: 'email@email.com',
    endereco: 'Rua dos Alfeneiros, 4'
  }

  beforeEach(async () => {
    await typeOrmUsuariosRepository.query('DELETE FROM usuarios');
  });

  test('POST /usuarios - deve cadastrar um usuario', async function() {
    const {statusCode, body} = await request(app)
      .post('/usuarios')
      .send(usuarioDTO);

    expect(statusCode).toBe(201);
    expect(body).toBe(null);
  });

  test('POST /usuarios - deve retornar 422 se o body não for enviado', async function() {
    const {statusCode, body} = await request(app)
      .post('/usuarios')
      .send({});

    expect(statusCode).toBe(422);
    expect(body.message).toEqual('Erro na validação');
    expect(body.errors.fieldErrors).toEqual({
      nome: ['Nome é obrigatório'],
      cpf: ['CPF é obrigatório'],
      telefone: ['Telefone é obrigatório'],
      email: ['Email é obrigatório'],
      endereco: ['Endereço é obrigatório']
    });
  });

  test('GET /usuarios/cpf/:cpf - deve retornar 200 com um um usuario', async function() {
    await typeOrmUsuariosRepository.save(usuarioDTO);

    const { statusCode, body } = await request(app)
      .get(`/usuarios/cpf/123.456.789-00`);

    expect(statusCode).toBe(200);
  });

});
