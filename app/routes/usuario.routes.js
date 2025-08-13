const { Router } = require('express');
const userController = require('../controllers/usuarios.controller');
const auth = require('../middlewares/auth');

const route = new Router();

/**
 * @openapi
 * /valeua/user:
 *   post:
 *     summary: Crea un nuevo usuario (registro).
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *       400:
 *         description: Datos inválidos.
 */
route.post('/user', userController.create);

/**
 * @openapi
 * /valeua/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve token JWT.
 *       401:
 *         description: Credenciales inválidas.
 */
route.post('/login', userController.login);

// Middleware de autenticación para las siguientes rutas
route.use(auth);

/**
 * @openapi
 * /valeua/user:
 *   get:
 *     summary: Obtiene todos los usuarios.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *       401:
 *         description: No autorizado.
 */
route.get('/user', userController.getAll);

/**
 * @openapi
 * /valeua/user/{key}/{value}:
 *   put:
 *     summary: Actualiza la información de un usuario.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Campo por el que buscar (ej. "correo", "id").
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
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Usuario actualizado.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: No autorizado.
 */
route.put('/user/:key/:value', userController.update);

/**
 * @openapi
 * /valeua/user/{key}/{value}:
 *   delete:
 *     summary: Elimina un usuario.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Campo por el que buscar (ej. "correo", "id").
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor a buscar.
 *     responses:
 *       200:
 *         description: Usuario eliminado.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: No autorizado.
 */
route.delete('/user/:key/:value', userController.delete);

module.exports = route;
