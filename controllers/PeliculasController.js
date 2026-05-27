const db = require('../data/db');

class PeliculasController {
    static listar(req, res) {
        res.status(200).json(db.peliculas);
    }

    static obtenerPorId(req, res) {
        const peli = db.peliculas.find(p => p.id === parseInt(req.params.id));
        if (!peli) return res.status(404).json({ message: "Película no encontrada" });
        res.status(200).json(peli);
    }

    static ultimasCinco(req, res) {
        // Ordena las películas por año de estreno (de más nueva a más vieja) y toma 5
        const peliculasOrdenadas = [...db.peliculas].sort((a, b) => b.anio - a.anio);
        res.status(200).json(peliculasOrdenadas.slice(0, 5));
    }

    static agregar(req, res) {
        const nuevaPelicula = {
            id: db.peliculas.length + 1,
            titulo: req.body.titulo,
            anio: parseInt(req.body.anio),
            genero: req.body.genero
        };
        db.peliculas.push(nuevaPelicula);
        res.status(201).json(nuevaPelicula);
    }

    static editar(req, res) {
        const index = db.peliculas.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).json({ message: "Película no encontrada" });
        
        db.peliculas[index] = { ...db.peliculas[index], ...req.body };
        res.status(200).json(db.peliculas[index]);
    }

    static eliminar(req, res) {
        db.peliculas = db.peliculas.filter(p => p.id !== parseInt(req.params.id));
        res.status(200).json({ message: "Película eliminada correctamente" });
    }
}

module.exports = PeliculasController;