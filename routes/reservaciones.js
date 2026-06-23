const express = require('express');
const router = express.Router();
const ReservacionesController = require('../controllers/ReservacionesController');

router.get('/', ReservacionesController.listar);
router.post('/', ReservacionesController.agregar);
router.get('/:id/editar', ReservacionesController.mostrarEditar); 
router.put('/:id', ReservacionesController.editar);               
router.delete('/:id', ReservacionesController.eliminar);

module.exports = router;