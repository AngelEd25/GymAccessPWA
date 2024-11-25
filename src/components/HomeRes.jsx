import React from 'react';
import './../assets/Home.css';

const HomeRes = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a GymAccess</h1>
        <p>La mejor forma de gestionar tu gimnasio con tecnología avanzada.</p>
        <button className="cta-button">Comenzar Ahora</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Control de Acceso</h2>
          <p>Accede a tus instalaciones de forma rápida y segura.</p>
        </div>
        <div className="feature-card">
          <h2>Gestión de Suscripciones</h2>
          <p>Administra planes y pagos fácilmente desde cualquier dispositivo.</p>
        </div>
        <div className="feature-card">
          <h2>Planes de Entrenamiento</h2>
          <p>Consulta y personaliza los planes de entrenamiento de tus usuarios.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 GymAccess. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeRes;