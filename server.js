const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const User = require(__dirname + '/models/User');


app.post('/register', async (req, res) => {
  try {
    
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});


// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://BodyTrack:Hpuente7Mila@myapp.zta05mu.mongodb.net/MyAppDB?retryWrites=true&w=majority&appName=MyApp')
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
