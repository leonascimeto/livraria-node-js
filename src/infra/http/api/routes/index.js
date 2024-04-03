const { Router } = require('express');
const { usuariosRoutes } = require('./usuario.routes');
const { livroRoutes } = require('./livro.routes');
const { emprestimoRoutes } = require('./emprestimo.routes');

const routes = Router();
routes.use('/usuarios', usuariosRoutes);
routes.use('/livros', livroRoutes);
routes.use('/emprestimos', emprestimoRoutes);

module.exports = routes;
