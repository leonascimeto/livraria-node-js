const { Router } = require('express');
const { usuariosRoutes } = require('./usuario.routes');
const { livroRoutes } = require('./livro.routes');

const routes = Router();
routes.use('/usuarios', usuariosRoutes);
routes.use('/livros', livroRoutes);

module.exports = routes;
