const {Router} = require('express');
const userController = require('../controllers/usuarios.controller');

const route = new Router();


route.post('/user', userController.create)
route.get('/user', userController.getAll)
route.put('/user/:key/:value', userController.update)
route.delete('/user/:key/:value', userController.delete)

module.exports = route;