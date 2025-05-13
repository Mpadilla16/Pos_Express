document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:4000/api/productos')
    .then(response => response.json())
    .then(data => {
      const tabla = document.getElementById('tabla-productos');
      data.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
          <td>${producto.stock}</td>
          <td>${producto.categoria}</td>
        `;
        tabla.appendChild(fila);
      });
    })
    .catch(error => console.error('Error al cargar productos:', error));
});
