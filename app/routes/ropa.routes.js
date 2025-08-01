const {Router} = require('express');
const ropaController = require('../controllers/ropa.controller');

const route = new Router();


route.post('/ropa', ropaController.create)
route.get('/ropa', ropaController.getAll)
route.get('/ropa/:key/:value', ropaController.searchItem)
route.put('/ropa/:key/:value', ropaController.update)
route.delete('/ropa/:key/:value', ropaController.delete)



module.exports = route;