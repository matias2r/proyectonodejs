const express = require('express');
const router = express.Router();
const reservacionesController = require('../controllers/reservacionControllers');

// Obtener la lista de reservas
router.get('/', reservacionesController.obtenerReservaciones)

// Obtener por id
router.get('/:id', reservacionesController.obtenerReservacionPorId)

// Crear reserva
router.post('/', reservacionesController.crearReservacion)

// Actualizar información de una reserva
router.put('/:id', reservacionesController.actualizarReservacion)

// Eliminar Reservacion
router.delete('/:id', reservacionesController.eliminarReservacion)


module.exports = router