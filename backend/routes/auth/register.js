const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../../db');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { email, password, nickname, id_rol } = req.body;

  // Validación simple
  if (!email || !password || !nickname || !id_rol) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

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

module.exports = router;