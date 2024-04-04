const { typeOrmEmprestimosRepository } = require("../../../db/typeorm/repositories/emprestimo.repository");
const { typeOrmLivrosRepository } = require("../../../db/typeorm/repositories/livro.repository");
const { typeOrmUsuariosRepository } = require("../../../db/typeorm/repositories/usuario.repository");
const httpServer = require("../../http-server");
const request = require("supertest");

describe('Emprestimo Routes', function() {
  const { app } = httpServer();

  const livroDTO = {
    titulo: 'livro_valido',
    quantidade: 2,
    autor: 'autor valido',
    genero: 'genero valido',
    isbn: 'isbn_valido',
  }

  const livroDTO2 = {
    titulo: 'livro_valido2',
    quantidade: 2,
    autor: 'autor valido2',
    genero: 'genero valido2',
    isbn: 'isbn_valido2',
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

  afterAll(async () => {
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

  test('PUT /emprestimos/devolver - deve devolver um livro sem multa', async function() {
    const livro = await typeOrmLivrosRepository.save(livroDTO);
    const usuario = await typeOrmUsuariosRepository.save(usuarioDTO);
    const payload = {
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-16',
      data_retorno: '2024-02-23',
    }
    const emprestimo = await typeOrmEmprestimosRepository.save(payload);

    const {statusCode, body} = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({ data_devolucao: '2024-02-23' });
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      emprestimo_id: emprestimo.id,
      multa: 0,
    });
  });

  test('PUT /emprestimos/devolver - deve devolver um livro com multa', async function() {
    const livro = await typeOrmLivrosRepository.save(livroDTO);
    const usuario = await typeOrmUsuariosRepository.save(usuarioDTO);
    const payload = {
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-16',
      data_retorno: '2024-02-23',
    }
    const emprestimo = await typeOrmEmprestimosRepository.save(payload);

    const {statusCode, body} = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({ data_devolucao: '2024-02-24' });
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      emprestimo_id: emprestimo.id,
      multa: 10.0,
    });
  });

  test('PUT /emprestimos/devolver - deve retornar 422 se o body não for enviado', async function() {
    const {statusCode, body} = await request(app)
      .put('/emprestimos/devolver/1')
      .send({});
    
    expect(statusCode).toBe(422);
    expect(body.message).toEqual('Erro na validação');
    expect(body.errors.fieldErrors).toEqual({
      data_devolucao: ['Data de devolução é obrigatória'],
    });
  });

  test('GET /emprestimos - deve retornar 200 com um array de emprestimos pendentes', async function() {
    const livro = await typeOrmLivrosRepository.save(livroDTO);
    const livro2 = await typeOrmLivrosRepository.save(livroDTO2);
    const usuario = await typeOrmUsuariosRepository.save(usuarioDTO);
    const payload = [
      {
        livro_id: livro.id,
        usuario_id: usuario.id,
        data_saida: '2024-02-16',
        data_retorno: '2024-02-23',
      }, 
      {
        livro_id: livro2.id,
        usuario_id: usuario.id,
        data_saida: '2024-02-16',
        data_retorno: '2024-02-23',
        data_devolucao: '2024-02-23',
      } 
    ]
    await typeOrmEmprestimosRepository.save(payload);

    const {statusCode, body} = await request(app).get('/emprestimos');

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
  });

});
