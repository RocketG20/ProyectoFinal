require('dotenv').config();
const express = require('express');
const routerFiguras = require('./router/figurasRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;


// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Figuras Coleccionables",
            version: "1.0.0",
            description: `
                ## Descripción General
                Esta API permite gestionar un catálogo de figuras coleccionables, incluyendo operaciones CRUD completas.

                ## Uso Básico
                - **GET /figuras**: Obtener todas las figuras
                - **GET /figuras/{id}**: Obtener una figura específica
                - **POST /figuras**: Agregar una nueva figura
                - **PUT /figuras/{id}**: Actualizar una figura existente
                - **DELETE /figuras/{id}**: Eliminar una figura

                ## Autenticación
                Actualmente la API no requiere autenticación.

                ## Ejemplos
                Puedes probar los endpoints directamente desde esta interfaz.

                ## Códigos de Estado
                - 200: OK
                - 201: Creado
                - 400: Solicitud incorrecta
                - 404: No encontrado
                - 500: Error del servidor
            `,
            contact: {
                name: "Soporte de la API",
                email: "soporte@tudominio.com"
            }
        },
        servers: [
            {
                url: "https://proyectofinal-production-b4e7.up.railway.app/",
                description: "Servidor de producción"
            },
            {
                url: `http://localhost:${port}`,
                description: "Servidor local de desarrollo"
            }
        ],
        tags: [
            {
                name: "Figuras",
                description: "Operaciones relacionadas con figuras coleccionables"
            }
        ],
        externalDocs: {
            description: "Documentación adicional",
            url: "https://github.com/RocketG20/ProyectoFinal/blob/main/README.md"
        }
    },
    apis: ["./router/figurasRouter.js"]
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middlewares
app.use(express.json());

// Rutas
app.use('/figuras', routerFiguras);

app.get('/', (req, res) => {
    res.send("¡Bienvenido a la API de figuras coleccionables!!");
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