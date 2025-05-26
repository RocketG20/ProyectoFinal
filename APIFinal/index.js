require('dotenv').config();
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const routerZodiaco = require('./router/zodiacoRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Signos Zodiacales",
            version: "1.0.0",
            description: "Documentación de la API de signos zodiacales"
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ["./router/zodiacoRouter.js"]
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

// Rutas
app.use('/zodiaco', routerZodiaco);

app.get('/', (req, res) => {
    res.send("¡Bienvenido a la API de signos zodiacales!");
});

// Manejo de errores
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
});