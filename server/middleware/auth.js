const jwt = require('jsonwebtoken');

// Verifica que venga un token válido en el header Authorization
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se envió token de autenticación' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // acá queda { nombre, email, sector, ... } según lo que firme el login
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// Se usa DESPUÉS de verifyToken. Solo deja pasar si el sector es Gerencia
function requireGerencia(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'No se verificó el token todavía' });
  }

  if (req.user.sector !== 'Gerencia') {
    return res.status(403).json({ error: 'No tenés permisos para esta acción' });
  }

  next();
}

module.exports = { verifyToken, requireGerencia };