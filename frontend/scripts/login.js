const loginForm = document.getElementById('form-login');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena }),
    });

    const data = await res.json();

    if (res.ok) {
      //alert(data.message || 'Login exitoso');
      
      // Guardar info del usuario en sessionStorage para usar en el dashboard
      sessionStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Redirigir al dashboard
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de red o del servidor');
  }
});
