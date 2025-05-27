const Usuario = require('../models/userModel');

// Iniciar sesión (NO TOCAR)
exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    if (contrasena !== usuarioEncontrado.contrasena) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuarioEncontrado._id,
        usuario: usuarioEncontrado.usuario,
        correo: usuarioEncontrado.correo,
        rol: usuarioEncontrado.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Buscar usuarios por nombre o usuario
exports.buscarUsuario = async (req, res) => {
  try {
    const { q } = req.query;
    const usuarios = await Usuario.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { usuario: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, usuario, contrasena, correo, rol } = req.body;
    const nuevoUsuario = new Usuario({ nombre, usuario, contrasena, correo, rol });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario' });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar usuario' });
  }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener usuario' });
  }
};
