const pool = require('../config/database');

class SalasController {
    static async listar(req, res) {
        try {
            const [salas] = await pool.query('SELECT * FROM salas');
            res.render('salas/index', { salas });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async agregar(req, res) {
        try {
            const { nombre, capacidad } = req.body;
            await pool.query('INSERT INTO salas (nombre, capacidad) VALUES (?, ?)', [nombre, parseInt(capacidad)]);
            res.redirect('/salas');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async mostrarEditar(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM salas WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).send("Sala no encontrada");
            res.render('salas/editar', { sala: rows[0] });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async editar(req, res) {
        try {
            const { nombre, capacidad } = req.body;
            await pool.query('UPDATE salas SET nombre = ?, capacidad = ? WHERE id = ?', [nombre, parseInt(capacidad), req.params.id]);
            res.redirect('/salas');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async eliminar(req, res) {
        try {
            await pool.query('DELETE FROM salas WHERE id = ?', [req.params.id]);
            res.redirect('/salas');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = SalasController;