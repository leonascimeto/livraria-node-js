const { emprestimoRepository, typeOrmEmprestimosRepository } = require("./emprestimo.repository");
const { typeOrmLivrosRepository } = require("./livro.repository");
const { typeOrmUsuariosRepository } = require("./usuario.repository");

describe('Emprestimo Repository Typeorm', function() {

  let sut;

  const emprestimo = {
    livro_id: 1,
    usuario_id: 1,
    data_retorno: '2021-10-10',
    data_saida: '2021-10-01',
  }

  const livro = {
    titulo: 'titulo',
    quantidade: 2,
    autor: 'autor',
    genero: 'genero',
    isbn: 'isbn',
  }

  const livro2 = {
    titulo: 'titulo2',
    quantidade: 2,
    autor: 'autor2',
    genero: 'genero2',
    isbn: 'isbn2',
  }

  const usuario = {
    nome: 'Carlos Silva', 
    cpf: '123.456.789-00', 
    email: 'email@email', 
    endereco: 'Rua dos Alfeneiros, 4', 
    telefone: '(11) 99999-9999'
  }

  const usuario2 = {
    nome: 'Carlos Silva2', 
    cpf: '123.456.789-01', 
    email: 'email2@email', 
    endereco: 'Rua dos Alfeneiros, 5', 
    telefone: '(11) 99999-9998'
  }

  beforeAll(() => {
    sut = emprestimoRepository();
  });

  beforeEach(async () => {
    await typeOrmEmprestimosRepository.delete({});
    await typeOrmUsuariosRepository.delete({});
    await typeOrmLivrosRepository.delete({});
  });

  test('deve retornar void ao criar um emprestimo', async function () {
    const livroRep = await typeOrmLivrosRepository.save(livro);
    const usuarioRep = await typeOrmUsuariosRepository.save(usuario);
    const emprestimoCriado = await sut.emprestar({
      ...emprestimo,
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id
    });
    expect(emprestimoCriado).toBeUndefined();
  });

  test('deve realizar a devolução', async function () {
    const livroRep = await typeOrmLivrosRepository.save(livro);
    const usuarioRep = await typeOrmUsuariosRepository.save(usuario);
    const remprestimoRep = await typeOrmEmprestimosRepository.save({
      ...emprestimo,
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id
    });

    const devolver = await sut.devolver({
      id: remprestimoRep.id,
      data_devolucao: '2021-10-10'
    });

    const buscaEmprestimoPorId = await typeOrmEmprestimosRepository.findOneBy({ id: remprestimoRep.id });

    expect(devolver.data_retorno).toBe(remprestimoRep.data_retorno);
    expect(buscaEmprestimoPorId.data_devolucao).toBe('2021-10-10');
  });

  test('deve retornar emprestimos pendentes', async function () {
    const livroRep = await typeOrmLivrosRepository.save(livro);
    const livroRep2 = await typeOrmLivrosRepository.save(livro2);
    const usuarioRep = await typeOrmUsuariosRepository.save(usuario);
    await typeOrmEmprestimosRepository.save([{
      ...emprestimo,
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id,
      data_devolucao: '2021-10-10'
    },
    {
      data_retorno: '2021-10-10',
      data_saida: '2021-10-01',
      livro_id: livroRep2.id,
      usuario_id: usuarioRep.id
    }]);

    const emprestimosPendentes = await sut.buscarEmprestimosPendentes();

    expect(emprestimosPendentes).toHaveLength(1);
    expect(emprestimosPendentes[0].data_devolucao).toBeUndefined();
    expect(emprestimosPendentes[0].id).toBeDefined();
    expect(emprestimosPendentes[0].data_saida).toBe('2021-10-01');
    expect(emprestimosPendentes[0].data_retorno).toBe('2021-10-10');
    expect(emprestimosPendentes[0].livro.titulo).toBe(livro2.titulo);
    expect(emprestimosPendentes[0].usuario.cpf).toBe(usuarioRep.cpf);
  });

  test('deve retornar false se não existir livro pendente para o usuario', async function () {
    const livroRep = await typeOrmLivrosRepository.save(livro);
    const usuarioRep = await typeOrmUsuariosRepository.save(usuario);
    await typeOrmEmprestimosRepository.save({
      ...emprestimo,
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id,
      data_devolucao: '2021-10-10'
    });

    const existe = await sut.existeLivroPendenteUsuario({
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id
    });

    expect(existe).toBe(false);
  });

  test('deve retornar true se existir livro pendente para o usuario', async function () {
    const livroRep = await typeOrmLivrosRepository.save(livro);
    const usuarioRep = await typeOrmUsuariosRepository.save(usuario);
    await typeOrmEmprestimosRepository.save({
      ...emprestimo,
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id,
    });

    const existe = await sut.existeLivroPendenteUsuario({
      livro_id: livroRep.id,
      usuario_id: usuarioRep.id
    });

    expect(existe).toBe(true);
  });

  test('deve retornar a quantidade de livros emprestados por usuario', async function () {
    const livroRep = await typeOrmLivrosRepository.save(livro);
    const livroRep2 = await typeOrmLivrosRepository.save(livro2);
    const usuarioRep = await typeOrmUsuariosRepository.save(usuario);
    await typeOrmEmprestimosRepository.save([
      {
        ...emprestimo,
        livro_id: livroRep.id,
        usuario_id: usuarioRep.id,
      },
      { 
        ...emprestimo,
        livro_id: livroRep2.id,
        usuario_id: usuarioRep.id,
      }
    ]);

    const quantidade = await sut.quantidadeLivrosEmprestadoPorUsuario(usuarioRep.id);

    expect(quantidade).toBe(2);
  });

});
