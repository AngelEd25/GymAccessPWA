import React, { useState } from 'react';
import '../styles/Register.css';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');




  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación (por ejemplo, enviar los datos al backend)

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Password:', password);
    console.log('Password:', password);

  };

  return (
    <div className="register-container">
      <div className="logo">Gym Access</div>
      <div className="register-form">
        <h2>¡BIENVENIDO! </h2>
        <h2>Ingresa tus datos porfavor</h2>
        <form id="card-form-register">

          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
          <input type="text" onChange={(e) => setLastname(e.target.value)} placeholder="Apellidos" />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo Electrónico" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
          <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Usuario" />
          <Link type="button" to="/admin/login">Ya tengo una cuenta</Link>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>

  );
}

export default Register;
