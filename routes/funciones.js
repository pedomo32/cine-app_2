const express = require('express');
const router = express.Router();
const FuncionesController = require('../controllers/FuncionesController');

router.get('/', FuncionesController.listar);
router.post('/', FuncionesController.agregar);
router.get('/:id/editar', FuncionesController.mostrarEditar); 
router.put('/:id', FuncionesController.editar);              
router.delete('/:id', FuncionesController.eliminar);

module.exports = router;