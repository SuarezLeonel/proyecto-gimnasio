const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../../db');

// Recuperación de contraseña
router.post('/recover', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Faltan datos para recuperar contraseña' });
  }

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