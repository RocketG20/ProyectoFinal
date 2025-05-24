require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con ID:', connection.threadId);
});

function obtenerSigno(req, res) {
    const fecha = req.query.fecha; // Esperamos una fecha en formato 'YYYY-MM-DD'

    // Validación del formato de fecha
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!fecha || !regexFecha.test(fecha)) {
        return res.status(400).json({ error: "Por favor, proporciona una fecha válida en formato YYYY-MM-DD." });
    }

    const consulta = `
        SELECT Nombre FROM zodiaco
        WHERE DATE_FORMAT(Inicio, '%m-%d') <= DATE_FORMAT(?, '%m-%d')
        AND DATE_FORMAT(Fin, '%m-%d') >= DATE_FORMAT(?, '%m-%d')
    `;

    connection.query(consulta, [fecha, fecha], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al obtener el signo zodiacal." });
        }

        if (results.length > 0) {
            res.json({ signo: results[0].Nombre });
        } else {
            res.json({ mensaje: "No se encontró un signo zodiacal para esa fecha." });
        }
    });
}

module.exports = { obtenerSigno };