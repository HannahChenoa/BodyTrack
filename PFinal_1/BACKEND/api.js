const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors({
  origin: '*', // ← Esto permite cualquier origen
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Rutas
const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

// Conexión a MongoDB (pon tu URL aquí)
mongoose.connect('mongodb+srv://admin:NuevaYork26@cluster0.oqqzpjo.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB', err));

module.exports = app;
