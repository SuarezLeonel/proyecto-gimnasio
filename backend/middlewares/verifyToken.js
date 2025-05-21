const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables del archivo .env

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader; // Ya no se hace split

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user;
    next();
  });
}

module.exports = verifyToken;