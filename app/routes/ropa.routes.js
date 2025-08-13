const { Router } = require('express');
const ropaController = require('../controllers/ropa.controller');

const route = new Router();

/**
 * @openapi
 * /valeua/ropa:
 *   post:
 *     summary: Crea un nuevo producto de ropa.
 *     tags:
 *       - Ropa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto.
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto.
 *               talla:
 *                 type: string
 *                 description: Talla del producto (S, M, L, XL).
 *               color:
 *                 type: string
 *                 description: Color del producto.
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 *       400:
 *         description: Datos inválidos.
 */
route.post('/ropa', ropaController.create);

/**
 * @openapi
 * /valeua/ropa:
 *   get:
 *     summary: Obtiene todos los productos de ropa.
 *     tags:
 *       - Ropa
 *     responses:
 *       200:
 *         description: Lista de productos.
 */
route.get('/ropa', ropaController.getAll);

/**
 * @openapi
 * /valeua/ropa/{key}/{value}:
 *   get:
 *     summary: Busca productos de ropa por un campo específico.
 *     tags:
 *       - Ropa
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Campo por el que buscar (ej. "genero(hombre,mujer)", "talla (M,G)".
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor a buscar.
 *     responses:
 *       200:
 *         description: Lista de productos que coinciden con la búsqueda.
 *       404:
 *         description: No se encontraron productos.
 */
route.get('/ropa/:key/:value', ropaController.searchItem);

/**
 * @openapi
 * /valeua/ropa/{key}/{value}:
 *   put:
 *     summary: Actualiza un producto de ropa según un criterio de búsqueda.
 *     tags:
 *       - Ropa
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Campo por el que buscar.
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor a buscar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *               talla:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Producto no encontrado.
 */
route.put('/ropa/:key/:value', ropaController.update);

/**
 * @openapi
 * /valeua/ropa/{key}/{value}:
 *   delete:
 *     summary: Elimina un producto de ropa según un criterio de búsqueda.
 *     tags:
 *       - Ropa
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Campo por el que buscar.
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor a buscar.
 *     responses:
 *       200:
 *         description: Producto eliminado.
 *       404:
 *         description: Producto no encontrado.
 */
route.delete('/ropa/:key/:value', ropaController.delete);

module.exports = route;
