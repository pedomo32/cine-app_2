const express = require('express');
const router = express.Router();
const PeliculasController = require('../controllers/PeliculasController');

router.get('/', PeliculasController.listar);
router.post('/', PeliculasController.agregar);
router.get('/:id/editar', PeliculasController.mostrarEditar); 
router.put('/:id', PeliculasController.editar);              

router.delete('/:id', PeliculasController.eliminar);

module.exports = router;