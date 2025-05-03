import { useState } from 'react';
import { crearUsuario } from '../../PFinal_1/api';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', contraseña: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await crearUsuario(form);
    console.log('Usuario creado:', resultado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <input name="contraseña" onChange={handleChange} type="password" />
      <button type="submit">Registrarse</button>
    </form>
  );
}
