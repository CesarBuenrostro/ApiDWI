const {Router} = require('express');
const ropaController = require('../controllers/ropa.controller');

const route = new Router();


route.post('/ropa', ropaController.create)
route.get('/ropa', ropaController.getAll)
route.put('/ropa/:id', ropaController.update)
route.delete('/ropa/:id', ropaController.delete)



module.exports = route;