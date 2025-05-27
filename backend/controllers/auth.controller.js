const Usuario = require('../models/userModel');

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    // Buscar usuario por campo 'usuario'
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Validar contraseña sin encriptar (temporal)
    if (contrasena !== usuarioEncontrado.contrasena) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });

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
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
