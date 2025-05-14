const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Registro de usuario
router.post('/register', async (req, res) => {
  console.log('Register request:', req.body);
  const { email, password, nickname, id_rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO usuarios (email, password_hash, nickname, id_rol) VALUES (?, ?, ?, ?)';

    db.query(sql, [email, hashedPassword, nickname, id_rol], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario registrado correctamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ message: 'Login exitoso', usuario: user.nickname });
  });
});

// Recuperación de contraseña
router.post('/recover', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = 'UPDATE usuarios SET password_hash = ? WHERE email = ?';

    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ message: 'Contraseña actualizada correctamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;