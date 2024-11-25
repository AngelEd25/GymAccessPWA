import React from "react";
import { Link } from "react-router-dom";
import "./../assets/Sidebar.css"; // Estilos del sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Admin Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard">Inicio</Link>
        </li>
        <li>
          <Link to="/admin/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/admin/subscriptions">Subscripciones</Link>
        </li>
        <li>
          <Link to="/admin/reports">Reportes</Link>
        </li>
        <li>
          <Link to="/admin/settings">Configuración</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
