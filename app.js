require('dotenv').config(); 
const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const peliculasRoutes = require('./routes/peliculas');
const salasRoutes = require('./routes/salas');
const reservacionesRoutes = require('./routes/reservaciones');
const funcionesRoutes = require('./routes/funciones');

const apiRoutes = require('./routes/api');

app.use('/peliculas', peliculasRoutes);
app.use('/salas', salasRoutes);
app.use('/reservaciones', reservacionesRoutes);
app.use('/funciones', funcionesRoutes);

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.render('index'); // Tu menú principal si tienes uno
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api/peliculas`);
});