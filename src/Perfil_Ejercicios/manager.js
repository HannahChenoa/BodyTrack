const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Esquema de ejercicios (esto debe coincidir con lo que guarda el admin)
const ejercicioSchema = new mongoose.Schema({
  nombre: String,
  musculo: String,
  descripcion: String,
  link: String
});

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema, 'exercises'); // ← nombre real de tu colección

// GET /api/ejercicios
router.get('/api/ejercicios', async (req, res) => {
  try {
    const data = await Ejercicio.find();
    res.json(data);
  } catch (err) {
    console.error('Error al obtener ejercicios:', err);
    res.status(500).json({ message: 'Error al cargar ejercicios' });
  }
});

module.exports = router;
