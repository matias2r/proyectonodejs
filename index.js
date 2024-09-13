// Cargamos variables de entorno.
require('dotenv').config()

// Importacion modulo de express.
const express = require('express')

// Importacion modulo de cors.
const cors = require('cors')

// Importacion modulo de Swagger.
// const swaggerUI = require('swagger-ui-express')
// const swaggerJsDoc = require('swagger-jsdoc')

// Modulo para manejo de rutas.
const path = require('path')

// Definimos puerto en el cual correremos el servidor. Con puerto alternativo.
const port = process.env.PORT || 3005

// Definimos el host en el cual estara nuestro proyecto.
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`

// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Node API for Order Management',
//             version: '1.0.0',
//         },
//         servers: [
//             {
//                 url: serverUrl,
//             },
//         ],
//     },
//     apis: [`${path.join(__dirname, './routes/*.js')}`],
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions)

// Creacion de instancia de la aplicacion.
const app = express();

// Habilitamos cors para todas las rutas.
app.use(cors());


// Middleware para pasear las solicitudes con formato json.
app.use(express.json());


// Creamos una ruta de ejemplo
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

// Importamos la ruta de recursos ( reservaciones )
const reservacionesRoutes = require("./routes/reservaciones")
// Usar las rutas de los recursos.
app.use('/api/reservas', reservacionesRoutes)
// app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Iniciacion del servidor.
app.listen(port, () => console.log(`Servidor corriendo en el servidor ${serverUrl}`));