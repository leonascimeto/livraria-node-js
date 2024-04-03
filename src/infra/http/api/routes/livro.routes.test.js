const { typeOrmLivrosRepository } = require("../../../db/typeorm/repositories/livro.repository");
const httpServer = require("../../http-server");
const request = require("supertest");

describe('Livro Routes', function() {
  const { app } = httpServer();

  const input = {
    titulo: 'livro_valido',
    quantidade: 2,
    autor: 'autor valido',
    genero: 'genero valido',
    isbn: 'isbn_valido',
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

  test('GET /livros?valor=isbn_valido - deve retornar 200 com um livro', async function() {
    await typeOrmLivrosRepository.save(input);

    const { statusCode, body } = await request(app)
      .get(`/livros`).query({ valor: 'isbn_valido' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(input));
  });

  test('GET /livros?valor=livro_valido - deve retornar 200 com um livro', async function() {
    await typeOrmLivrosRepository.save(input);
    const { statusCode, body } = await request(app)
      .get(`/livros`).query({ valor: 'livro_valido' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(input));
  });

  test('GET /livros?valor=isbn_invalido - deve retornar 200 e array vazio', async function() {
    const { statusCode, body } = await request(app)
      .get(`/livros`).query({ valor: 'isbn_invalido' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(0);
  });

});
