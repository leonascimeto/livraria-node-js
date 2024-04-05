const { resolve } = require('path');
const { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASS, POSTGRES_USER, POSTGRES_PORT } = require('../../../shared/constants');

module.exports = {
  type: 'postgres',
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  synchronize: false,
  username: POSTGRES_USER,
  password: POSTGRES_PASS,
  port: POSTGRES_PORT,
  entities: [resolve(__dirname, 'entities', '*.entity-typeorm.js')],
}
