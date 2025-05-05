document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');        // <- agregado
    const userEmail = localStorage.getItem('userEmail');  // <- correcto
    const inputName = document.getElementById('nameInput');
    const inputEmail = document.getElementById('emailInput');
    const editButton = document.getElementById('editProfileBtn');
  
    // Validar que haya sesión
    if (!userEmail) {
      alert('No hay usuario autenticado');
      window.location.href = './login.html';
      return;
    }
  
    // Cargar datos del usuario
    try {
      const res = await fetch(`http://localhost:3000/profile/${userEmail}`);
      const data = await res.json();
  
      inputName.value = data.name;
      inputEmail.value = data.email;
  
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      alert('No se pudo cargar el perfil');
    }
  
    // Editar perfil
    editButton.addEventListener('click', async () => {
      const newName = inputName.value;
      const newEmail = inputEmail.value;
  
      try {
        const res = await fetch(`http://localhost:3000/profile/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newName, email: newEmail })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert('Perfil actualizado correctamente');
          localStorage.setItem('userName', data.user.name);
        } else {
          alert(data.message || 'Error al actualizar');
        }
      } catch (err) {
        console.error('Error al actualizar perfil:', err);
        alert('Error en la solicitud');
      }
    });
  });
  