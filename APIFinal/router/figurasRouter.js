const express = require('express');
const router = express.Router();
const { obtenerFiguras, obtenerFiguraPorId, agregarFigura, actualizarFigura, eliminarFigura } = require('../controllers/figurasController');

/**
 * @swagger
 * /figuras:
 *   get:
 *     summary: Obtiene todas las figuras coleccionables
 *     description: Devuelve un listado de figuras coleccionables almacenadas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de figuras coleccionables recuperadas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la figura
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la figura
 *                   franquicia:
 *                     type: string
 *                     description: Franquicia a la que pertenece
 *                   año_lanzamiento:
 *                     type: integer
 *                     description: Año de lanzamiento
 *                   estado:
 *                     type: string
 *                     description: Estado de conservación de la figura
 */

router.get('/', obtenerFiguras);

/**
 * @swagger
 * /figuras/{id}:
 *   get:
 *     summary: Obtiene una figura por su ID
 *     description: Busca y devuelve los detalles de una figura específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la figura
 *     responses:
 *       200:
 *         description: Información de la figura recuperada con éxito.
 *       404:
 *         description: Figura no encontrada.
 */

router.get('/:id', obtenerFiguraPorId);

/**
 * @swagger
 * /figuras:
 *   post:
 *     summary: Agrega una nueva figura
 *     description: Inserta una nueva figura coleccionable en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               franquicia:
 *                 type: string
 *               año_lanzamiento:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Figura agregada con éxito.
 *       400:
 *         description: Datos incorrectos o faltantes.
 */

router.post('/', agregarFigura);

/**
 * @swagger
 * /figuras/{id}:
 *   put:
 *     summary: Actualiza una figura
 *     description: Modifica la información de una figura existente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               franquicia:
 *                 type: string
 *               año_lanzamiento:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Figura actualizada con éxito.
 *       404:
 *         description: Figura no encontrada.
 */

router.put('/:id', actualizarFigura);

/**
 * @swagger
 * /figuras/{id}:
 *   delete:
 *     summary: Elimina una figura
 *     description: Borra una figura de la base de datos según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Figura eliminada con éxito.
 *       404:
 *         description: Figura no encontrada.
 */

router.delete('/:id', eliminarFigura);

module.exports = router;