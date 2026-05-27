const express = require('express');
const router = express.Router();


const PeliculasCtrl = require('../controllers/PeliculasController');
const FuncionesCtrl = require('../controllers/FuncionesController');
const ReservacionesCtrl = require('../controllers/ReservacionesController');


router.get('/peliculas', PeliculasCtrl.listar);                   
router.get('/peliculas/top/ultimas', PeliculasCtrl.ultimasCinco);
router.get('/peliculas/:id', PeliculasCtrl.obtenerPorId);         
router.get('/funciones/fecha', FuncionesCtrl.porRangoDeFecha);   

router.post('/peliculas', PeliculasCtrl.agregar);                 
router.post('/funciones', FuncionesCtrl.agregar);                 
router.post('/reservaciones', ReservacionesCtrl.agregar);        


router.put('/peliculas/:id', PeliculasCtrl.editar);              
router.put('/reservaciones/:id', ReservacionesCtrl.editar);      


router.delete('/peliculas/:id', PeliculasCtrl.eliminar);          
router.delete('/reservaciones/:id', ReservacionesCtrl.eliminar);  

router.delete('/reservaciones/:id/tickets/:ticketId', ReservacionesCtrl.removerTicket); 

module.exports = router;