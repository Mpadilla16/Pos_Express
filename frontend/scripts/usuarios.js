const url = 'http://localhost:5000/api/usuarios';

const formulario = document.getElementById('formulario-usuario');
const tablaUsuarios = document.getElementById('tabla-usuarios');
const editForm = document.getElementById('editForm');
const buscador = document.getElementById('buscar-user');

let idEditando = null;

// Cargar usuarios al iniciar
document.addEventListener('DOMContentLoaded', cargarUsuarios);

// Crear nuevo usuario
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const rol = document.getElementById('rol').value;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, correo, contrasena, rol })
    });

    if (!res.ok) throw new Error('Error al crear usuario');

    formulario.reset();
    cargarUsuarios();
  } catch (error) {
    console.error(error);
  }
});

// Obtener y mostrar todos los usuarios
async function cargarUsuarios() {
  tablaUsuarios.innerHTML = '';
  try {
    const res = await fetch(url);
    const usuarios = await res.json();

    usuarios.forEach((usuario) => {
      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>${usuario.usuario}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.contrasena}</td>
        <td>${usuario.rol}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarUsuario('${usuario._id}')">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
        </td>
      `;

      tablaUsuarios.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar usuarios', error);
  }
}

// Eliminar usuario
async function eliminarUsuario(id) {
  if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

  try {
    const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');
    cargarUsuarios();
  } catch (error) {
    console.error(error);
  }
}

// Editar usuario - llenar el formulario de edición
async function editarUsuario(id) {
  try {
    const res = await fetch(url);
    const usuarios = await res.json();
    const usuario = usuarios.find((u) => u._id === id);

    document.getElementById('editUserId').value = usuario._id;
    document.getElementById('editUsuario').value = usuario.usuario;
    document.getElementById('editEmail').value = usuario.correo;

    editForm.classList.remove('oculto');
    idEditando = usuario._id;
  } catch (error) {
    console.error('Error al obtener datos del usuario', error);
  }
}

// Guardar cambios del usuario editado
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('editUserId').value;
  const usuario = document.getElementById('editUsuario').value;
  const correo = document.getElementById('editEmail').value;

  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, correo })
    });

    if (!res.ok) throw new Error('Error al actualizar usuario');

    editForm.classList.add('oculto');
    editForm.reset();
    idEditando = null;
    cargarUsuarios();
  } catch (error) {
    console.error(error);
  }
});

// Buscar usuarios por nombre de usuario
buscador.addEventListener('input', async () => {
  const texto = buscador.value.toLowerCase();

  try {
    const res = await fetch(url);
    const usuarios = await res.json();

    const filtrados = usuarios.filter((u) =>
      u.usuario.toLowerCase().includes(texto)
    );

    tablaUsuarios.innerHTML = '';
    filtrados.forEach((usuario) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuario.usuario}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.contrasena}</td>
        <td>${usuario.rol}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarUsuario('${usuario._id}')">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
        </td>
      `;
      tablaUsuarios.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al filtrar usuarios', error);
  }
});
