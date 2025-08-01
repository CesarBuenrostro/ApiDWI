const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// Middleware para autenticar al usuario
const auth = require('../middlewares/auth');

// Todas las rutas usan autenticación
router.use(auth);

// Obtener el carrito del usuario
router.get('/carrito', carritoController.obtainCart);

// Vaciar el carrito completo
router.delete('/carrito', carritoController.emptyCart);


// Agregar un producto al carrito
router.post('/carrito/product', carritoController.addProduct);

// Actualizar cantidad de un producto
router.put('/carrito/product', carritoController.updateProduct);

// Eliminar producto del carrito
router.delete('/carrito/product', carritoController.deleteProduct);


module.exports = router;
