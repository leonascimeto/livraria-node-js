const { typeOrmLivrosRepository } = require("../../../db/typeorm/repositories/livro.repository");
const httpServer = require("../../http-server");
const request = require("supertest");

describe('Livro Routes', function() {
  const { app } = httpServer();

  const input = {
    titulo: 'livro valido',
    quantidade: 2,
    autor: 'autor valido',
    genero: 'genero valido',
    isbn: 'isbn valido',
  }

  beforeEach(async () => {
    await typeOrmLivrosRepository.query('DELETE FROM livros');
  });

  test('POST /livros - deve cadastrar um livro', async function() {
    const {statusCode, body} = await request(app)
      .post('/livros')
      .send(input);

    expect(statusCode).toBe(201);
    expect(body).toBe(null);
  });

});
