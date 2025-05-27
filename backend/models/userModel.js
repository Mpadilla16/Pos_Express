const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, required: true, default: 'usuario' }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);


