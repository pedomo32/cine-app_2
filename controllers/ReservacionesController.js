const db = require('../data/db');

class ReservacionesController {
    static agregar(req, res) {
        const nuevaReservacion = {
            id: db.reservaciones.length + 1,
            cliente: req.body.cliente,
            funcionId: parseInt(req.body.funcionId),
            tickets: req.body.tickets || [] // Array de IDs de tickets (ej: [1, 2])
        };
        db.reservaciones.push(nuevaReservacion);
        res.status(201).json(nuevaReservacion);
    }

    static editar(req, res) {
        const index = db.reservaciones.findIndex(r => r.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).json({ message: "Reservación no encontrada" });
        db.reservaciones[index] = { ...db.reservaciones[index], ...req.body };
        res.status(200).json(db.reservaciones[index]);
    }

    static eliminar(req, res) {
        db.reservaciones = db.reservaciones.filter(r => r.id !== parseInt(req.params.id));
        res.status(200).json({ message: "Reservación eliminada" });
    }

    static removerTicket(req, res) {
        const reservacion = db.reservaciones.find(r => r.id === parseInt(req.params.id));
        if (!reservacion) return res.status(404).json({ message: "Reservación no encontrada" });
        
        const ticketId = parseInt(req.params.ticketId);
        // Filtramos para dejar por fuera el ticket que queremos desvincular (romper relación)
        reservacion.tickets = reservacion.tickets.filter(tId => tId !== ticketId);
        
        res.status(200).json({ message: "Relación eliminada: Ticket removido", reservacion });
    }
}

module.exports = ReservacionesController;