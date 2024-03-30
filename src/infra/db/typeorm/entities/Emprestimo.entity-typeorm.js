const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Emprestimo',
  tableName: 'emprestimos',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    livro_id: {
      type: 'int',
    },
    usuario_id: {
      type: 'int',
    },
    data_retorno: {
      type: 'date',
    },
    data_saida: {
      type: 'date',
    },
    data_devolucao: {
      type: 'date',
      nullable: true,
    },
  },
  relations: {
    livro: {
      target: 'Livro',
      type: 'many-to-one',
      joinColumn: {
        name: 'livro_id',
        referencedColumnName: 'id',
      },
    },
    usuario: {
      target: 'Usuario',
      type: 'many-to-one',
      joinColumn: {
        name: 'usuario_id',
        referencedColumnName: 'id',
      }
    },
  },
});
