const {Router} = require('express');
const userController = require('../controllers/usuarios.controller');
const auth = require('../middlewares/auth') // Middleware para poroteger rutas por token, pero no creo que sea necesario ¯\_(ツ)_/¯

const route = new Router();


route.post('/user', userController.create)
route.get('/user', userController.getAll)
route.put('/user/:key/:value', userController.update)
route.delete('/user/:key/:value', userController.delete)

route.post('/login', userController.login);

module.exports = route;