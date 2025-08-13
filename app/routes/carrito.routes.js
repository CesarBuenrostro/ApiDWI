const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');
const auth = require('../middlewares/auth');

// Todas las rutas usan autenticación
router.use(auth);

/**
 * @openapi
 * /valeua/carrito:
 *   get:
 *     summary: Obtiene el carrito del usuario autenticado.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente.
 *       401:
 *         description: No autorizado.
 */
router.get('/carrito', carritoController.obtainCart);

/**
 * @openapi
 * /valeua/carrito:
 *   delete:
 *     summary: Vacía el carrito completo del usuario autenticado.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/carrito', carritoController.emptyCart);

/**
 * @openapi
 * /valeua/carrito/product:
 *   post:
 *     summary: Agrega un producto al carrito.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a agregar.
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto.
 *     responses:
 *       201:
 *         description: Producto agregado al carrito.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 */
router.post('/carrito/product', carritoController.addProduct);

/**
 * @openapi
 * /valeua/carrito/product:
 *   put:
 *     summary: Actualiza la cantidad de un producto en el carrito.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto.
 *               quantity:
 *                 type: integer
 *                 description: Nueva cantidad.
 *     responses:
 *       200:
 *         description: Producto actualizado.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 */
router.put('/carrito/product', carritoController.updateProduct);

/**
 * @openapi
 * /valeua/carrito/product:
 *   delete:
 *     summary: Elimina un producto del carrito.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar.
 *     responses:
 *       200:
 *         description: Producto eliminado.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: No autorizado.
 */
router.delete('/carrito/product', carritoController.deleteProduct);

module.exports = router;
