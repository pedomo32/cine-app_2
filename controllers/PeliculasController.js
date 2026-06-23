const pool = require('../config/database');

class PeliculasController {
    static async listar(req, res) {
        try {
            const [peliculas] = await pool.query('SELECT * FROM peliculas');
            res.render('peliculas/index', { peliculas });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async agregar(req, res) {
        try {
            const { titulo, genero, duracion } = req.body;
            await pool.query('INSERT INTO peliculas (titulo, genero, duracion) VALUES (?, ?, ?)', [titulo, genero, parseInt(duracion)]);
            res.redirect('/peliculas');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async mostrarEditar(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).send("Película no encontrada");
            
            // Renderiza una nueva vista pasándole los datos de esa película específica
            res.render('peliculas/editar', { pelicula: rows[0] });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async editar(req, res) {
        try {
            const { titulo, genero, duracion } = req.body;
            await pool.query(
                'UPDATE peliculas SET titulo = ?, genero = ?, duracion = ? WHERE id = ?',
                [titulo, genero, parseInt(duracion), req.params.id]
            );
            res.redirect('/peliculas');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async eliminar(req, res) {
        try {
            await pool.query('DELETE FROM peliculas WHERE id = ?', [req.params.id]);
            res.redirect('/peliculas');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = PeliculasController;