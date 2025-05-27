const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Configurar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

// Crear la app de Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

//rutas
const userRoutes = require('./routes/user.routes');
app.use('/api/usuarios', userRoutes);

const productosRoutes = require('./routes/productos.routes');
app.use('/api/productos', productosRoutes); //  Rutas de productos

// Rutas de autenticación (login)
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});
