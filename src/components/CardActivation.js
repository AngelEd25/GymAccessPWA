import React from 'react';
import '../styles/CardActivation.css';

function CardActivation() {
  return (
    <div className="activation-container">
      <div className="logo">SPORTGYM</div>
      <form className="activation-form">
        <h2>Dar de Alta Tarjeta</h2>
        <input type="text" placeholder="Número de Tarjeta" />
        <input type="text" placeholder="Nombre de la Persona" />
        <input type="text" placeholder="ID de Usuario" />
        <input type="date" placeholder="Fecha de Activación" />
        <input type="date" placeholder="Fecha de Vencimiento" />
        <select>
          <option value="Mensual">Mensual</option>
          <option value="Anual">Anual</option>
        </select>
        <button type="submit">Activar</button>
      </form>
    </div>
  );
}

export default CardActivation;
