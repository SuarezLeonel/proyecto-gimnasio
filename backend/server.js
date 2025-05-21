const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // 📦 Carga variables desde .env

const app = express();

// 🔐 Middlewares
app.use(cors());
app.use(express.json());

// 📦 Rutas
const register = require('./routes/auth/register');
const login = require('./routes/auth/login');
const recover = require('./routes/auth/recover');
const protectedRoutes = require('./routes/protected');

app.use('/api/auth', register);
app.use('/api/auth', login);
app.use('/api/auth', recover);

// 🌐 Prefijos de rutas
//app.use('/api/auth', authRoutes); // registro, login, recuperación
app.use('/api', protectedRoutes); // rutas que requieren token

// ⚠️ Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 🚀 Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});