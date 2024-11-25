import React, { useState } from 'react';
import './../assets/AuthModal.css';

const AuthModal = ({ isOpen, onClose}) => {

  const [isLogin, setIsLogin] = useState(false); // Controla si el modal muestra Login o Registro

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', username: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación (ej. enviar loginForm al backend)
    console.log('Login:', loginForm);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Lógica de registro (ej. enviar registerForm al backend)
    console.log('Register:', registerForm);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>

        <div className="modal-content">
          {isLogin ? (
            <div>
              <h2>Iniciar Sesión</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
                    required
                    placeholder="Ingresa tu usuario"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    placeholder="Ingresa tu contraseña"
                  />
                </div>

                <button type="submit" className="auth-button">Ingresar</button>
              </form>
              <p className="toggle-form">
                ¿No tienes una cuenta? <span onClick={() => setIsLogin(false)}>Regístrate aquí</span>
              </p>
            </div>
          ) : (
            <div>
              <h2>Registro</h2>
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    required
                    placeholder="Ingresa tu nombre"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                    placeholder="Ingresa tu correo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                    required
                    placeholder="Elige un nombre de usuario"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    placeholder="Crea una contraseña"
                  />
                </div>

                <button type="submit" className="auth-button">Registrar</button>
              </form>
              <p className="toggle-form">
                ¿Ya tienes una cuenta? <span onClick={() => setIsLogin(true)}>Inicia sesión aquí</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
