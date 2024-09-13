
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
    reservaciones.push(nuevaReservacion);

    res.status(201).json({
        msg: 'Reservación creada con éxito.',
        data: nuevaReservacion,
    });
};

// Obtener listado de reservaciones
const obtenerReservaciones = async (req, res) => {
 const reservacionesBusqueda = reservaciones.length > 0

    if (!reservacionesBusqueda) {
        return res.status(400).json({ error: "No hay reservaciones en este momento."})
    } 
    
    res.json({ msg: 'Listado de Reservaciones', data: reservaciones })

}

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


// Obtener informacion sobre una Reservacion en especifico por Nombre de Hotel
const obtenerReservacionesPorNombreHotel = (req, res) => {
    const { nombreHotel } = req.query
    const reservacion = reservaciones.filter((r) => r.nombre === nombreHotel);
    console.log(req.query);
    if (reservacion.length === 0) {
      return res.status(404).json({ error: "No hay reservaciones en el Hotel Ingresado" });
    }
  
    res.json({ mensaje: `Información de las Reservaciones en el hotel ${nombreHotel}:`, reservacion });
};


// Filtrado de reservas por numero de huespedes.
const filtradoPorNumHuespedes = (req, res) => {
    const numHuespedes = parseInt(req.params.num_huespedes);
    console.log(numHuespedes);
    const reservacionesFiltradas = reservaciones.filter((r) => r.num_huespedes === numHuespedes);

    if (reservacionesFiltradas.length === 0) {
        return res.status(404).json({ error: "No se encontraron reservaciones con ese número de huéspedes" });
    }

    res.json({ mensaje: `Reservaciones con ${numHuespedes} huéspedes`, reservaciones: reservacionesFiltradas });
};

// Filtrado de reservas por Estado (Disponible - Reservado)
const obtenerReservacionesPorEstado = (req, res) => {
    const estado = req.query.estado.toLowerCase()
    const reservacion = reservaciones.filter((r) => r.estado.toLowerCase() === estado);
  
    if (reservacion.length === 0) {
      return res.status(404).json({ error: `No hay reservaciones en Estado: ${estado}` });
    }
  
    res.json({ mensaje: `Información de las Reservaciones en el hotel ${estado}:`, reservacion });
};

// Filtrado de reservaciones por Tipo de Habitacion
const filtradoReservacionesPorTipoHabitacion = (req, res) => {
    const tipoReservacion = req.query.tipo.toLowerCase();
    const reservacion = reservaciones.filter((t) => t.tipo.toLowerCase() == tipoReservacion);

    if (reservacion.length === 0) {
        return res.status(400).json({ error: "Tipo de Habitacion no Disponible."})
    }

    res.json({ mensaje: `Listado de Reservaciones con habitacion tipo ${tipoReservacion}`, reservacion})
}


// Filtrado de reservaciones por Fecha Inicio/Fin
const obtenerReservacionesPorRangoDeFechas = (req, res) => {
    const { fechaInicio, fechaFin } = req.params

    const reservacionesFiltradas = reservaciones.filter((f) => f.fechaEntrada && f.fechaSalida == fechaInicio && fechaFin);

    if (reservacionesFiltradas.length = 0) {
        return res.status(400).json({ error: `No hay reservaciones para el rango de fechas: ${fechaInicio} - ${fechaFin}`})
    }

    res.json({
        mensaje: `Listado de Reservaciones en el rango de fechas: ${fechaInicio} - ${fechaFin}`,
        reservaciones: reservacionesFiltradas
    })
}

module.exports = {
    crearReservacion,
    obtenerReservaciones,
    obtenerReservacionPorId,
    actualizarReservacion,
    eliminarReservacion,
    obtenerReservacionesPorNombreHotel,
    filtradoPorNumHuespedes,
    obtenerReservacionesPorEstado,
    obtenerReservacionesPorRangoDeFechas,
    filtradoReservacionesPorTipoHabitacion
}



