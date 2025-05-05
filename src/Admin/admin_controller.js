const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// URI CORRECTA
const uri = 'mongodb+srv://BodyTrack:Hpuente7Mila@myapp.zta05mu.mongodb.net/?retryWrites=true&w=majority&appName=MyApp';
const client = new MongoClient(uri);

// RUTA DE LOGIN ADMIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // CONECTA A MONGO SOLO SI NO ESTÁ CONECTADO
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }

    const db = client.db('MyAppDB');
    const adminCollection = db.collection('admin');

    // VERIFICAR EXACTAMENTE ESE CORREO Y CONTRASEÑA
    const admin = await adminCollection.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al hacer login de admin:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
