const reservaciones = require("../models/reservacionesModel");

// Obtener listado de reservaciones con opción de filtrar por nombre de hotel y otros parámetros
const obtenerReservaciones = async (req, res) => {
    const { hotel, num_huespedes, estado, tipo_habitacion, fecha_incio, fecha_fin } = req.query;
   
    let reservasFiltradas = reservaciones;
   
    if (hotel) {
      reservasFiltradas = reservasFiltradas.filter(
        (r) => r.nombre.toLowerCase() === hotel.toLowerCase()
      );
    }
   
    if (num_huespedes) {
      reservasFiltradas = reservasFiltradas.filter(
        (r) => r.num_huespedes === parseInt(num_huespedes)
      );
    }
   
    if (estado) {
      reservasFiltradas = reservasFiltradas.filter(
        (r) => r.estado.toLowerCase() === estado.toLowerCase()
      );
    }
   
    if (tipo_habitacion) {
      reservasFiltradas = reservasFiltradas.filter(
        (r) => r.tipo.toLowerCase() === tipo_habitacion.toLowerCase()
      );
    }
   
    if (fecha_incio && fecha_fin) {
      reservasFiltradas = reservasFiltradas.filter(
        (r) => r.fechaEntrada >= fecha_incio && r.fechaSalida <= fecha_fin
      );
    }
   
    if (reservasFiltradas.length === 0) {
      return res.status(404).json({ error: "No se encontraron reservaciones con los criterios dados." });
    }
   
    res.json({
      msg: "Reservaciones obtenidas con éxito.",
      data: reservasFiltradas,
    });
  };


// Función para generar un ID alfanumérico aleatorio
function generarIdAlfanumerico(longitud) {
    const caracteres = 'AFGJZabcryz0123456789';
    let id = '';
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(indiceAleatorio);
    }
    return id;
}

// Crear Reservación
const crearReservacion = async (req, res) => {
    const nuevaReservacion = req.body;
    nuevaReservacion.id = generarIdAlfanumerico(5);
    reservaciones.unshift(nuevaReservacion);

    res.status(201).json({
        msg: 'Reservación creada con éxito.',
        data: nuevaReservacion,
    });
};


// Obtener informacion sobre una Reservacion en especifico por ID
const obtenerReservacionPorId = (req, res) => {
    const reservacionId = req.params.id
    const reservacion = reservaciones.find((r) => r.id === reservacionId);
  
    if (!reservacion) {
      return res.status(404).json({ error: "Reservacion no encontrada" });
    }
    
    res.json({ mensaje: `Información del la Reservacion con ID: ${reservacionId}`, reservacion });
  };

// Actualizar informacion de una Reservacion
const actualizarReservacion = async (req, res) => {
    const reservacionId = req.params.id
    const reservacionIndex = reservaciones.findIndex((r) => r.id === reservacionId)

    if (reservacionIndex === -1) {
        return res.status(404).json({ msg: 'No se encontro la Reservacion' })
    }

    reservaciones[reservacionIndex] = { ...reservaciones[reservacionIndex], ...req.body }
    res.json({
        msg: 'Reservacion actualizada con éxito',
        data: reservaciones[reservacionIndex],
    })
}

// Eliminar una Reservacion
const eliminarReservacion = async (req, res) => {
    const reservacionId = req.params.id
    const reservacionIndex = reservaciones.findIndex((r) => r.id === reservacionId)

    if (reservacionIndex === -1) {
        return res.status(404).json({ msg: 'Reservacion no encontrada.'})
    }

    reservaciones.splice(reservacionIndex, 1)
    res.json({ msg: 'Reservacion eliminada con éxito.'})
}

module.exports = {
    crearReservacion,
    obtenerReservaciones,
    obtenerReservacionPorId,
    actualizarReservacion,
    eliminarReservacion,
}



