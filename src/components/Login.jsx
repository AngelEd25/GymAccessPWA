import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación (por ejemplo, enviar los datos al backend)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="logo">Gym Access</div>
      <div className="login-form" >
        <h2>¡BIENVENIDO!</h2>
        <h2>Ingresa tus datos para iniciar</h2>
        <form id="card-form-login" onSubmit={handleLogin}>
          
          <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Usuario" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
          <Link type="button" to="/admin/register">Registrarse</Link>
          <button type="submit">Iniciar Sesión</button>
          
        </form>        
      </div>

    </div>
  );
}

export default Login;
