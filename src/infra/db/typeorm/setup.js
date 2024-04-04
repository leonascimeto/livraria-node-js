const typeorm = require('typeorm');
const { resolve } = require('path');
const typeOrmProd = require('./typeorm.prod');

let typeormServer;

if(process.env.NODE_ENV === 'test') {
  typeormServer = new typeorm.DataSource({
    type: 'sqlite',
    database: 'db.test.sqlite',
    synchronize: true,
    dropSchema: true,
    entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')],
  });
} else if(process.env.NODE_ENV === 'integration') {
  typeormServer = new typeorm.DataSource({
    type: 'postgres',
    host: 'localhost',
    database: 'biblioteca_test',
    synchronize: true,
    username: 'admin',
    password: 'admin',
    port: 5432,
    entities: [resolve(__dirname, 'entities', '*.entity-typeorm.js')],
  });
} else {
  typeormServer = new typeorm.DataSource(typeOrmProd);
}


module.exports = {typeormServer};
