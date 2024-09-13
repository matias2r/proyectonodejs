const express = require('express');
const router = express.Router();
const reservacionesController = require('../controllers/reservacionControllers');

/**
 * @swagger
* components:
*  schemas:
*    Reservacion:
*      type: object
*      properties:
*        id:
*          type: integer
*          description: Identificador de la reserva
*        nombre:
*          type: string
*          description: Nombre del hotel
*        tipo:
*          type: string
*          description: Tipo de habitación
*        huespedes:
*          type: integer
*          description: Número de huéspedes para la habitación
*        fechaEntrada:
*          type: string
*          format: date
*          description: Fecha de entrada
*        fechaSalida:
*          type: string
*          format: date
*          description: Fecha de salida
*        estado:
*          type: string
*          description: Estado de la reserva
*        precio:
*          type: number
*          format: float
*          description: Precio de la reserva
*      required:
*        - id
*        - nombre
*        - tipo
*        - num_huespedes
*        - fechaEntrada
*        - fechaSalida
*        - estado
*        - precio
*      example:
*        id: "02ce38"
*        nombre: "Sheraton"
*        tipo: "Simple"
*        num_huespedes: 2
*        fechaEntrada: "2024-09-01"
*        fechaSalida: "2024-09-12"
*        estado: "Disponible"
*        precio: 400.0
*/


// Crear reserva
/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Crear reserva
 *    tags: [Reservas Hoteleras]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reservacion'
 *    responses:
 *      '201':
 *        description: Reservacion creada con exito
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reservacion'
 *      '400':
 *         description: Error al Crear la Reservacion
 *      '422':
 *         description: Validation exception
 */
router.post('/', reservacionesController.crearReservacion)

// Actualizar información de una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *    summary: Actualizar información de una reserva
 *    tags: [Reservas Hoteleras]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Ingrese el id de la reservacion a Modificar
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reservacion'
 *    responses:
 *      '200':
 *        description: Reservacion actualizada correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reservacion'
 *      '400':
 *         description: ID Invalido
 *      '404':
 *         description: Error al Actualizar la reservacion
 *      '422':
 *         description: Validation exception
 */
router.put('/:id', reservacionesController.actualizarReservacion)

// Eliminar Reservacion
/**
 * @swagger
 * /api/reservas/{id}:
 *  delete:
 *    summary: Eliminar una reservacion específica
 *    tags: [Reservas Hoteleras]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Ingrese el id de la reservacion a Eliminar
 *    responses:
 *      200:
 *        description: Reservacion Eliminada con éxito
 *      '404':
 *         description: Reservacion No encontrada
 *      '422':
 *         description: Validation exception
 */
router.delete('/:id', reservacionesController.eliminarReservacion)


// Filtrado de Reservaciones por nombre de Hotel
/**
 * @swagger
 * /api/reservas/hotel/{nombre}:
 *   get:
 *     summary: Obtener información de las reservaciones por nombre de hotel
 *     tags: [Reservas Hoteleras]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del hotel para buscar las reservaciones
 *     responses:
 *       '200':
 *         description: Reservaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservacion'
 *       '404':
 *         description: No se encontraron reservaciones
 *       '400':
 *         description: Error en la solicitud
 */

router.get('/hotel/:nombre', reservacionesController.obtenerReservacionesPorNombreHotel);

// Filtrado de Reservaciones por tipo de Habitacion
/**
 * @swagger
 * /api/reservas/habitaciones/{tipo}:
 *   get:
 *     summary: Obtener información de las reservaciones por nombre de hotel
 *     tags: [Reservas Hoteleras]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del hotel para buscar las reservaciones
 *     responses:
 *       '200':
 *         description: Reservaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservacion'
 *       '404':
 *         description: No se encontraron reservaciones
 *       '400':
 *         description: Error en la solicitud
 */
router.get('/habitaciones/:tipo', reservacionesController.filtradoReservacionesPorTipoHabitacion)

// Obtener Reservacion por num_huespedes
/**
 * @swagger
 * /api/reservas/huespedes/{num_huespedes}:
 *  get:
 *    summary: Obtener información de una reserva específica
 *    tags: [Reservas Hoteleras]
 *    parameters:
 *      - in: path
 *        name: num_huespedes
 *        schema:
 *          type: integer
 *        required: true
 *        description: Ingrese el id de la reservacion a Buscar
 *    requestBody:
 *    required: true
 *    content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reservacion'
 *    responses:
 *      200:
 *        description: Lista de reservas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reservacion'
 *      '400':
 *         description: ID Invalido
 *      '404':
 *         description: Reservacion no encontrada
 *      '422':
 *         description: Validation exception
 */
router.get('/huespedes/:num_huespedes', reservacionesController.filtradoPorNumHuespedes);

// Obtener la lista de reservas
/**
 * @swagger
 * /api/reservas:
 *  get:
 *    summary: Obtener la lista de reservas
 *    tags: [Reservas Hoteleras]
 *    responses:
 *      200:
 *        description: Lista de reservas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reservacion'
 *      '400':
 *         description: Error al Desplegar reservas
 *      '404':
 *         description: Reservas no encontradas
 *      '422':
 *         description: Validation exception
 */
router.get('/', reservacionesController.obtenerReservaciones)

// Obtener Reservacion por ID
/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *    summary: Obtener información de una reserva específica
 *    tags: [Reservas Hoteleras]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Ingrese el id de la reservacion a Buscar
 *    requestBody:
 *    required: true
 *    content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reservacion'
 *    responses:
 *      200:
 *        description: Lista de reservas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reservacion'
 *      '400':
 *         description: ID Invalido
 *      '404':
 *         description: Reservacion no encontrada
 *      '422':
 *         description: Validation exception
 */
router.get('/:id', reservacionesController.obtenerReservacionPorId)


// Filtrado de Reservaciones por nombre de Estado
/**
 * @swagger
 * /api/reservas/estado/{estado}:
 *   get:
 *     summary: Obtener información de las reservaciones por estado
 *     tags: [Reservas Hoteleras]
 *     parameters:
 *       - in: query
 *         name: estado
 *         required: true
 *         schema:
 *           type: string
 *         description: Estado para buscar las reservaciones
 *     responses:
 *       '200':
 *         description: Reservaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservacion'
 *       '404':
 *         description: No se encontraron reservaciones
 *       '400':
 *         description: Error en la solicitud
 */

router.get('/estado/:estado', reservacionesController.obtenerReservacionesPorEstado)


// Filtrado de reservaciones por fechas (Entrada - Salida)
/**
 * @swagger
 * /api/reservas/fechas/{fechaEntrada}:
 *   get:
 *     summary: Obtiene reservaciones por rango de fechas
 *     description: Filtra las reservaciones cuyo rango de fechas de entrada y salida cae dentro de las fechas especificadas.
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de inicio del rango (formato AAAA-MM-DD)
 *       - in: query
 *         name: fechaFin
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de fin del rango (formato AAAA-MM-DD)
 *     responses:
 *       '200':
 *         description: Reservaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservacion'
 *       '404':
 *         description: No se encontraron reservaciones
 *       '400':
 *         description: Error en la solicitud
 */

router.get('/fechas/:fechaEntrada', reservacionesController.obtenerReservacionesPorRangoDeFechas)

module.exports = router