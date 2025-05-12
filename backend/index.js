const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para leer datos en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Leer usuarios simulados (base de datos)
  const users = JSON.parse(fs.readFileSync('backend/users.json', 'utf8'));

  // Buscar coincidencia
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.send(`✅ Bienvenido, ${user.username}`);
  } else {
    res.status(401).send('❌ Usuario o contraseña incorrectos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
