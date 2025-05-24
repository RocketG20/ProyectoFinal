const express = require('express');
const router = express.Router();
const { obtenerSigno } = require('../controllers/zodiacoController');

/**
 * @swagger
 * /zodiaco/signo:
 *   get:
 *     summary: Obtiene el signo zodiacal según la fecha de nacimiento
 *     description: Calcula el signo zodiacal en función del parámetro `fecha`
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de nacimiento en formato YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Signo zodiacal calculado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signo:
 *                   type: string
 *                   description: Nombre del signo zodiacal
 *       400:
 *         description: Parámetro `fecha` faltante o con formato incorrecto
 *       404:
 *         description: Signo no encontrado
 */
router.get('/signo', obtenerSigno);

module.exports = router;