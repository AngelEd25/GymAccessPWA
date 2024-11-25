import React, { useState, useEffect } from 'react';
import './../assets/UserDashboard.css';

const UserDashboard = () => {
  // Estados para los usuarios y para el formulario de nuevo usuario
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });

  // Simulación de la obtención de datos de usuarios (puedes reemplazarlo con un fetch o Axios para la API)
  useEffect(() => {
    const fetchedUsers = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin' },
      { id: 2, name: 'María López', email: 'maria@example.com', role: 'user' },
      { id: 3, name: 'Carlos García', email: 'carlos@example.com', role: 'trainer' },
    ];
    setUsers(fetchedUsers);
  }, []);

  // Manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Agregar un nuevo usuario
  const handleAddUser = (e) => {
    e.preventDefault();
    const userId = users.length + 1;
    setUsers([...users, { ...newUser, id: userId }]);
    setNewUser({ name: '', email: '', role: 'user' }); // Resetear el formulario
  };

  // Eliminar un usuario
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard de Usuarios</h1>

      {/* Tabla de usuarios */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button">Editar</button>
                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar nuevos usuarios */}
      <div className="add-user-form">
        <h2>Agregar Nuevo Usuario</h2>
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              placeholder="Nombre del usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
              placeholder="Correo electrónico"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol</label>
            <select id="role" name="role" value={newUser.role} onChange={handleInputChange}>
              <option value="user">Usuario</option>
              <option value="trainer">Entrenador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="add-button">
            Agregar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
