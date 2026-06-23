const pool = require('../config/database');

class ReservacionesController {
    static async listar(req, res) {
        try {
            const [reservaciones] = await pool.query('SELECT * FROM reservaciones ORDER BY fecha_reserva DESC');
            res.render('reservaciones/index', { reservaciones });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async agregar(req, res) {
        try {
            const { nombre_cliente, fecha_reserva } = req.body;

            const fechaParaMySQL = fecha_reserva.replace('T', ' ') + ':00';

            await pool.query(
                'INSERT INTO reservaciones (nombre_cliente, fecha_reserva) VALUES (?, ?)', 
                [nombre_cliente, fechaParaMySQL]
            );
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async mostrarEditar(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM reservaciones WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).send("Reservación no encontrada");
            
            const r = rows[0];
            if (r.fecha_reserva) {
                const date = new Date(r.fecha_reserva);
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                r.fecha_formateada = date.toISOString().slice(0, 16);
            }

            res.render('reservaciones/editar', { reservacion: r });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async editar(req, res) {
        try {
            const { nombre_cliente, fecha_reserva } = req.body;

            const fechaParaMySQL = fecha_reserva.replace('T', ' ') + ':00';

            await pool.query(
                'UPDATE reservaciones SET nombre_cliente = ?, fecha_reserva = ? WHERE id = ?', 
                [nombre_cliente, fechaParaMySQL, req.params.id]
            );
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async eliminar(req, res) {
        try {
            await pool.query('DELETE FROM reservaciones WHERE id = ?', [req.params.id]);
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = ReservacionesController;