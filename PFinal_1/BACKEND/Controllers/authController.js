const User = require('../Models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    console.log("➡️ Datos recibidos en register:", req.body);
    const { name, email, password } = req.body;
    if (password.length < 8) return res.status(400).json({ msg: 'Contraseña demasiado corta' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    res.status(200).json({ msg: 'Inicio de sesión exitoso', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
