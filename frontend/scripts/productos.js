const url = 'http://localhost:5000/api/productos'; // Ajusta tu endpoint si es diferente

// Elementos del DOM
const form = document.getElementById('form-producto');
const btnAgregar = document.getElementById('btn-agregar-producto');
const tabla = document.getElementById('tabla-productos');
const buscarInput = document.getElementById('buscar-producto');

// Función para renderizar productos en la tabla
function renderProductos(productos) {
  tabla.innerHTML = '';
  productos.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>${producto.stock}</td>
      <td>$${producto.precio}</td>
      <td>
        <button class="btn btn-warning btn-sm me-1" onclick="editarProducto('${producto._id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Obtener productos de la API
async function obtenerProductos() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderProductos(data);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
}

// Agregar producto nuevo
btnAgregar.addEventListener('click', async () => {
  const nuevoProducto = {
    codigo: document.getElementById('codigo').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    categoria: document.getElementById('categoria').value,
    stock: parseInt(document.getElementById('stock').value),
    precio: parseFloat(document.getElementById('precio').value)
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    });

    if (res.ok) {
      form.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
      modal.hide();
      obtenerProductos();
    } else {
      console.error('Error al agregar producto');
    }
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
});

// Buscar productos por nombre o código
buscarInput.addEventListener('input', async () => {
  const filtro = buscarInput.value.toLowerCase();

  try {
    const res = await fetch(url);
    const productos = await res.json();

    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(filtro) || p.codigo.toLowerCase().includes(filtro)
    );

    renderProductos(filtrados);
  } catch (error) {
    console.error('Error en búsqueda:', error);
  }
});

// Eliminar producto
async function eliminarProducto(id) {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return;

  try {
    const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      obtenerProductos();
    } else {
      console.error('Error al eliminar');
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
}

// Editar producto (a completar)
function editarProducto(id) {
  alert('Funcionalidad de edición aún no implementada. ID del producto: ' + id);
}

// Inicializar
document.addEventListener('DOMContentLoaded', obtenerProductos);
