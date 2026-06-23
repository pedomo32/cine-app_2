const express = require('express');
const router = express.Router();
const SalasController = require('../controllers/SalasController');

router.get('/', SalasController.listar);
router.post('/', SalasController.agregar);
router.get('/:id/editar', SalasController.mostrarEditar); 
router.put('/:id', SalasController.editar);               
router.delete('/:id', SalasController.eliminar);

module.exports = router;