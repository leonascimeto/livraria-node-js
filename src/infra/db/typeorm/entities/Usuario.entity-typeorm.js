const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Usuario',
  tableName: 'usuarios',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    nome: {
      type: 'varchar',
    },
    cpf: {
      type: 'varchar',
      unique: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    endereco: {
      type: 'varchar',
    },
  },
});
