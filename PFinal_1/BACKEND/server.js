const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const rutasUsuarios = require('./routes/usuarios');
app.use(rutasUsuarios);

app.listen(3001, () => console.log('Servidor backend corriendo en puerto 3000'));
