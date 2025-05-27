document.addEventListener('DOMContentLoaded', () => {
  const usuarioJSON = sessionStorage.getItem('usuario');
  if (!usuarioJSON) {
    // Si no hay usuario logueado, redirigir a login
    window.location.href = 'login.html';
    return;
  }

  const usuario = JSON.parse(usuarioJSON);

  // Mostrar nombre o usuario en dashboard
  const nombreElemento = document.getElementById('nombre-usuario');
  if (nombreElemento) {
    nombreElemento.textContent = `Bienvenido, ${usuario.usuario}`;
  }
});
