const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Livro',
  tableName: 'livros',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    titulo: {
      type: 'varchar',
    },
    quantidade: {
      type: 'int',
    },
    autor: {
      type: 'varchar',
    },
    genero: {
      type: 'varchar',
    },
    isbn: {
      type: 'varchar',
      unique: true,
    },
  },
});
