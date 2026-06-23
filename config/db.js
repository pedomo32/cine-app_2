const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method')); 

const peliculasRoutes = require('./routes/peliculas');
const salasRoutes = require('./routes/salas');

app.use('/peliculas', peliculasRoutes);
app.use('/salas', salasRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});