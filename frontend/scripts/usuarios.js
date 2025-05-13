document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:4000/api/usuarios')
    .then(response => response.json())
    .then(data => {
      const tabla = document.getElementById('tabla-usuarios');
      data.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.rol}</td>
        `;
        tabla.appendChild(fila);
      });
    })
    .catch(error => console.error('Error al cargar usuarios:', error));
});
