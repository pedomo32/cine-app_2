const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 

const peliculasRoutes = require('./routes/peliculas');
const salasRoutes = require('./routes/salas');
const reservacionesRoutes = require('./routes/reservaciones');
const funcionesRoutes = require('./routes/funciones');
app.use('/peliculas', peliculasRoutes);
app.use('/salas', salasRoutes);
app.use('/reservaciones', reservacionesRoutes);
app.use('/funciones', funcionesRoutes);

app.get('/', (req, res) => {
    res.send('<h1> Sistema del Cine</h1><p>Navega a: <a href="/peliculas">Películas</a> | <a href="/salas">Salas</a> | <a href="/reservaciones">Reservaciones</a> | <a href="/funciones">Funciones</a></p>');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});