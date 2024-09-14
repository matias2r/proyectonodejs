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
*        num_huespedes:
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

// Obtener la lista de reservas
/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtiene una lista de reservaciones filtrada por parámetros.
 *     tags: [Reservas Hoteleras]
 *     description: Este endpoint permite obtener reservaciones filtradas por diferentes criterios, como el nombre del hotel, número de huéspedes, estado de la reservación, tipo de habitación, y rango de fechas.
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *         description: Filtra por nombre del hotel.
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Filtra por número de huéspedes.
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtra por estado de la reservación (ej. disponible, reservado).
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         description: Filtra por tipo de habitación (ej. simple, doble).
 *       - in: query
 *         name: fecha_incio
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra por la fecha de inicio de la reservación (YYYY-MM-DD).
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra por la fecha de fin de la reservación (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Lista de reservaciones filtradas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Reservaciones obtenidas con éxito."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       nombre:
 *                         type: string
 *                         example: "Hotel Example"
 *                       num_huespedes:
 *                         type: integer
 *                         example: 2
 *                       tipo:
 *                         type: string
 *                         example: "doble"
 *                       fechaEntrada:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-14"
 *                       fechaSalida:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-15"
 *                       estado:
 *                         type: string
 *                         example: "confirmada"
 *                       precio:
 *                         type: number
 *                         example: 150.00
 *       404:
 *         description: No se encontraron reservaciones con los datos ingresados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se encontraron reservaciones con los datos ingresados."
 */
router.get('/', reservacionesController.obtenerReservaciones)

// Obtener reservaciones por ID
router.get('/:id', reservacionesController.obtenerReservacionPorId)

// Crear reservacion
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

// Actualizar información de una Reserva
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

// Eliminar Reservacion por ID
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


module.exports = router