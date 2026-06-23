const pool = require('../config/database');

class FuncionesController {
    static async listar(req, res) {
        try {
            const query = `
                SELECT f.id, p.titulo AS pelicula, s.nombre AS sala, f.fecha_hora, f.precio 
                FROM funciones f
                JOIN peliculas p ON f.pelicula_id = p.id
                JOIN salas s ON f.sala_id = s.id
            `;
            const [funciones] = await pool.query(query);
            res.render('funciones/index', { funciones });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async agregar(req, res) {
        try {
            const { pelicula_id, sala_id, fecha_hora, precio } = req.body;
            await pool.query(
                'INSERT INTO funciones (pelicula_id, sala_id, fecha_hora, precio) VALUES (?, ?, ?, ?)', 
                [parseInt(pelicula_id), parseInt(sala_id), fecha_hora, parseFloat(precio)]
            );
            res.redirect('/funciones');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async mostrarEditar(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM funciones WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).send("Función no encontrada");
            
            // Convertimos la fecha de la BD al formato que acepta el input datetime-local (YYYY-MM-DDTHH:MM)
            const f = rows[0];
            if(f.fecha_hora) {
                const date = new Date(f.fecha_hora);
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                f.fecha_formateada = date.toISOString().slice(0, 16);
            }

            res.render('funciones/editar', { funcion: f });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async editar(req, res) {
        try {
            const { pelicula_id, sala_id, fecha_hora, precio } = req.body;
            await pool.query(
                'UPDATE funciones SET pelicula_id = ?, sala_id = ?, fecha_hora = ?, precio = ? WHERE id = ?',
                [parseInt(pelicula_id), parseInt(sala_id), fecha_hora, parseFloat(precio), req.params.id]
            );
            res.redirect('/funciones');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async eliminar(req, res) {
        try {
            await pool.query('DELETE FROM funciones WHERE id = ?', [req.params.id]);
            res.redirect('/funciones');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = FuncionesController;