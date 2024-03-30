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
    data_devolucao: '2021-10-10',
  }

  const livro = {
    titulo: 'titulo',
    quantidade: 2,
    autor: 'autor',
    genero: 'genero',
    isbn: 'isbn',
  }

  const usuario = {
    nome: 'Carlos Silva', 
    cpf: '123.456.789-00', 
    email: 'email@email', 
    endereco: 'Rua dos Alfeneiros, 4', 
    telefone: '(11) 99999-9999'
  }

  beforeAll(() => {
    sut = emprestimoRepository();
  });

  beforeEach(async () => {
    await typeOrmEmprestimosRepository.clear();
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
      emprestimo_id: remprestimoRep.id,
      data_devolucao: '2021-10-10'
    });

    const buscaEmprestimoPorId = await typeOrmEmprestimosRepository.findOneBy({ id: remprestimoRep.id });

    console.log('buscaEmprestimoPorId', buscaEmprestimoPorId);

    expect(devolver.data_retorno).toBe(remprestimoRep.data_retorno);
    expect(buscaEmprestimoPorId.data_devolucao).toBe(emprestimo.data_devolucao);
  });

});
