const API_URL = 'http://localhost:3000/api'; // cambia si usas producción

export const crearUsuario = async (datos) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  return res.json();
};
