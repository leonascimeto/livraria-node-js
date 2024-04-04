const { resolve } = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  database: 'biblioteca',
  synchronize: false,
  username: 'admin',
  password: 'admin',
  port: 5432,
  entities: [resolve(__dirname, 'entities', '*.entity-typeorm.js')],
}
