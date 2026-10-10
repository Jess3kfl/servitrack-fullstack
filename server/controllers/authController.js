const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const login = async (req, res, next) => {
  try {
    const { email, password, sector } = req.body;
    if (!email || !password || !sector) {
      return res.status(400).json({ mensaje: 'Email, contraseña y sector son obligatorios' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.sector !== sector) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, usuario.passwordHash);
    if (!ok) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, email: usuario.email, sector: usuario.sector },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: { nombre: usuario.nombre, email: usuario.email, sector: usuario.sector },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };