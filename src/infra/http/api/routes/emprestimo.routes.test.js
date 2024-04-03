const { typeOrmEmprestimosRepository } = require("../../../db/typeorm/repositories/emprestimo.repository");
const { typeOrmLivrosRepository } = require("../../../db/typeorm/repositories/livro.repository");
const { typeOrmUsuariosRepository } = require("../../../db/typeorm/repositories/usuario.repository");
const httpServer = require("../../http-server");
const request = require("supertest");

describe('Livro Routes', function() {
  const { app } = httpServer();

  const livroDTO = {
    titulo: 'livro_valido',
    quantidade: 2,
    autor: 'autor valido',
    genero: 'genero valido',
    isbn: 'isbn_valido',
  }

  const usuarioDTO = {
    nome: 'Carlos Silva',
    cpf: '123.456.789-00',
    telefone: '(11) 99999-9999',
    email: 'email@email.com',
    endereco: 'Rua dos Alfeneiros, 4'
  }

  beforeEach(async () => {
    await typeOrmEmprestimosRepository.query('DELETE FROM emprestimos');
    await typeOrmLivrosRepository.query('DELETE FROM livros');
    await typeOrmUsuariosRepository.query('DELETE FROM usuarios');
  });

  test('POST /emprestimos - deve emprestar um livro a um usuario', async function() {
    const livro = await typeOrmLivrosRepository.save(livroDTO);
    const usuario = await typeOrmUsuariosRepository.save(usuarioDTO);
    const payload = {
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-16',
      data_retorno: '2024-02-23',
    }

    const {statusCode, body} = await request(app).post('/emprestimos').send(payload);
    
    expect(statusCode).toBe(201);
    expect(body).toBe(null);
  });
});
