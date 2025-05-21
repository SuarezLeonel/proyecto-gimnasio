const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/perfil', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.email}`, usuario: req.user });
});

module.exports = router;