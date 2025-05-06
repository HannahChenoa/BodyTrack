document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('contenedorHistorial');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  if (!userId) {
    contenedor.innerHTML = '<p class="text-danger">No se encontró usuario. Inicia sesión.</p>';
    return;
  }

  try {
    const res = await fetch(`/api/history/${userId}`);
    const historial = await res.json();

    if (historial.length === 0) {
      contenedor.innerHTML = '<p class="text-white">No tienes rutinas guardadas.</p>';
      return;
    }

    historial.forEach((rutina) => {
      const columna = document.createElement('div');
      columna.className = 'col-md-6 mb-4';

      const tarjeta = document.createElement('div');
      tarjeta.className = 'card h-100 border-primary';

      const cuerpo = document.createElement('div');
      cuerpo.className = 'card-body';

      cuerpo.innerHTML += `<h5 class="card-title">${rutina.nombreRutina}</h5>`;
      cuerpo.innerHTML += `<p class="text-muted"><small>Fecha: ${rutina.fecha}</small></p>`;

      rutina.ejercicios.forEach((ej) => {
        cuerpo.innerHTML += `
          <hr>
          <p class="mb-1"><strong>${ej.nombre}</strong></p>
          <p class="mb-1">Repeticiones: ${ej.repeticiones}</p>
          <p class="mb-1">Peso: ${ej.peso}</p>
        `;
      });

      tarjeta.appendChild(cuerpo);
      columna.appendChild(tarjeta);
      contenedor.appendChild(columna);
    });

  } catch (err) {
    contenedor.innerHTML = '<p class="text-danger">Error cargando historial.</p>';
    console.error(err);
  }
});
