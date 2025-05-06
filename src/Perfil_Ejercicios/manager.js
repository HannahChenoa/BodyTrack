const express = require('express');
const router = express.Router();
const Ejercicio = require('../../models/Ejercicio'); // Asegúrate que este archivo exista

// GET /api/ejercicios → Obtener todos los ejercicios
router.get('/api/ejercicios', async (req, res) => {
  try {
    const data = await Ejercicio.find();
    res.json(data);
  } catch (err) {
    console.error('Error al obtener ejercicios:', err);
    res.status(500).json({ message: 'Error al cargar ejercicios' });
  }
});

// POST /api/ejercicios → Crear nuevo ejercicio
router.post('/api/ejercicios', async (req, res) => {
  try {
    const { nombre, musculo, descripcion, link } = req.body;

    if (!nombre || !musculo || !descripcion) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevo = new Ejercicio({ nombre, musculo, descripcion, link });
    await nuevo.save();

    res.status(201).json({ message: 'Ejercicio guardado exitosamente' });
  } catch (err) {
    console.error('Error al guardar ejercicio:', err);
    res.status(500).json({ message: 'Error al guardar ejercicio' });
  }
});

module.exports = router;
