const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// LOGIN (no tocar)
router.post('/login', userController.login);

// CRUD Usuarios
router.get('/', userController.obtenerUsuarios);
router.get('/buscar', userController.buscarUsuario);
router.post('/', userController.crearUsuario);
router.get('/:id', userController.obtenerUsuarioPorId);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;




