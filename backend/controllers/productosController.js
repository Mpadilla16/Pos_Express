const Producto = require('../models/productoModel');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Buscar producto por nombre o código
exports.buscarProducto = async (req, res) => {
  try {
    const { q } = req.query; // Ejemplo: /productos/buscar?q=teclado
    const productos = await Producto.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { codigo: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar producto' });
  }
};

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const { codigo, nombre, categoria, stock, precio } = req.body;
    const nuevoProducto = new Producto({ codigo, nombre, categoria, stock, precio });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar producto' });
  }
};
