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

function obtenerFiguras(req, res) {
    const consulta = `SELECT * FROM figuras`;

    connection.query(consulta, (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al obtener las figuras." });
        }

        res.json(results);
    });
}

function obtenerFiguraPorId(req, res) {
    const id = req.params.id;
    const consulta = `SELECT * FROM figuras WHERE id = ?`;

    connection.query(consulta, [id], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al obtener la figura." });
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ mensaje: "Figura no encontrada." });
        }
    });
}

function agregarFigura(req, res) {
    const { nombre, franquicia, año_lanzamiento, estado } = req.body;
    
    if (!nombre || !franquicia || !año_lanzamiento || !estado) {
        return res.status(400).json({ error: "Todos los campos son requeridos." });
    }

    const consulta = `INSERT INTO figuras (nombre, franquicia, año_lanzamiento, estado) VALUES (?, ?, ?, ?)`;

    connection.query(consulta, [nombre, franquicia, año_lanzamiento, estado], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al agregar la figura." });
        }

        res.status(201).json({ mensaje: "Figura agregada con éxito.", id: results.insertId });
    });
}

function actualizarFigura(req, res) {
    const id = req.params.id;
    const { nombre, franquicia, año_lanzamiento, estado } = req.body;

    if (!nombre || !franquicia || !año_lanzamiento || !estado) {
        return res.status(400).json({ error: "Todos los campos son requeridos." });
    }

    const consulta = `UPDATE figuras SET nombre = ?, franquicia = ?, año_lanzamiento = ?, estado = ? WHERE id = ?`;

    connection.query(consulta, [nombre, franquicia, año_lanzamiento, estado, id], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al actualizar la figura." });
        }

        res.json({ mensaje: "Figura actualizada con éxito." });
    });
}

function eliminarFigura(req, res) {
    const id = req.params.id;
    const consulta = `DELETE FROM figuras WHERE id = ?`;

    connection.query(consulta, [id], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al eliminar la figura." });
        }

        res.json({ mensaje: "Figura eliminada con éxito." });
    });
}

module.exports = { obtenerFiguras, obtenerFiguraPorId, agregarFigura, actualizarFigura, eliminarFigura };