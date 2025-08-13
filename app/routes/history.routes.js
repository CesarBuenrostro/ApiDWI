const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');
const auth = require('../middlewares/auth');

// Todas las rutas usan autenticación
router.use(auth);

/**
 * @openapi
 * /valeua/history:
 *   get:
 *     summary: Obtiene el historial completo.
 *     tags:
 *       - Historial
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de elementos del historial.
 *       401:
 *         description: No autorizado.
 */
router.get('/history', historyController.obtainHistory);

/**
 * @openapi
 * /valeua/history:
 *   post:
 *     summary: Crea un nuevo registro en el historial.
 *     tags:
 *       - Historial
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Tipo de acción o evento.
 *               descripcion:
 *                 type: string
 *                 description: Descripción del evento.
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha del evento.
 *     responses:
 *       201:
 *         description: Registro creado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 */
router.post('/history', historyController.create);

/**
 * @openapi
 * /valeua/history:
 *   put:
 *     summary: Actualiza un registro del historial.
 *     tags:
 *       - Historial
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del registro a actualizar.
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Registro actualizado.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Registro no encontrado.
 *       401:
 *         description: No autorizado.
 */
router.put('/history', historyController.update);

/**
 * @openapi
 * /valeua/history:
 *   delete:
 *     summary: Elimina un registro del historial.
 *     tags:
 *       - Historial
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del registro a eliminar.
 *     responses:
 *       200:
 *         description: Registro eliminado.
 *       404:
 *         description: Registro no encontrado.
 *       401:
 *         description: No autorizado.
 */
router.delete('/history', historyController.delete);

module.exports = router;
