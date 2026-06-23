const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/peliculas', async (req, res) => {
    try {
        const [peliculas] = await pool.query('SELECT * FROM peliculas');
        res.json(peliculas); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/salas', async (req, res) => {
    try {
        const [salas] = await pool.query('SELECT * FROM salas');
        res.json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;