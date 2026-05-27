const db = require('../data/db');

class FuncionesController {
    static agregar(req, res) {
        const nuevaFuncion = {
            id: db.funciones.length + 1,
            peliculaId: parseInt(req.body.peliculaId),
            salaId: parseInt(req.body.salaId),
            fecha: new Date(req.body.fecha) // Formato esperado: YYYY-MM-DD
        };
        db.funciones.push(nuevaFuncion);
        res.status(201).json(nuevaFuncion);
    }

    static porRangoDeFecha(req, res) {
        const { inicio, fin } = req.query; // Ejemplo: ?inicio=2026-01-01&fin=2026-12-31
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);

        const filtradas = db.funciones.filter(f => f.fecha >= fechaInicio && f.fecha <= fechaFin);
        res.status(200).json(filtradas);
    }
}

module.exports = FuncionesController;