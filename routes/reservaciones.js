const express = require('express');
const router = express.Router();
const reservacionesController = require('../controllers/reservacionControllers');


// Crear reserva
router.post('/', reservacionesController.crearReservacion)

// Actualizar información de una reserva
router.put('/:id', reservacionesController.actualizarReservacion)

// Eliminar Reservacion
router.delete('/:id', reservacionesController.eliminarReservacion)

// Filtrado de Reservaciones por nombre de Hotel
router.get('/', reservacionesController.obtenerReservacionesPorNombreHotel);

// Filtrado de Reservaciones por tipo de Habitacion
router.get('/', reservacionesController.filtradoReservacionesPorTipoHabitacion)

// Obtener Reservacion por num_huespedes
router.get('/:num_huespedes', reservacionesController.filtradoPorNumHuespedes);

// Obtener la lista de reservas
router.get('/', reservacionesController.obtenerReservaciones)

// Obtener Reservacion por ID
router.get('/:id', reservacionesController.obtenerReservacionPorId)


// Filtrado de Reservaciones por nombre de Estado
router.get('/estado/:estado', reservacionesController.obtenerReservacionesPorEstado)


// Filtrado de reservaciones por fechas (Entrada - Salida)
router.get('/fechas/:fechaEntrada', reservacionesController.obtenerReservacionesPorRangoDeFechas)

module.exports = router