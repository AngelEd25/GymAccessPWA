import { Global } from "../helpers/global";

// Obtener el perfil de usuario por ID
const ReqPerfil = async (id) => {
  try {
    const request = await fetch(Global.url + `/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"), // Nota: Corregí el nombre de "Autorization"
      },
    });
    const PerfilData = await request.json();
    return PerfilData;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw error;
  }
};


// Registro de Usuario
const registerUser = async (userData) => {
  try {
    const response = await fetch(Global.url + `/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }

    const createdUser = await response.json();
    return createdUser;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    // Almacena la solicitud en cola para sincronización offline
    const pendingRequests = getFromLocalStorage("pendingRequests") || [];
    pendingRequests.push({ type: "POST", endpoint: "/user/register", data: userData });
    saveToLocalStorage("pendingRequests", pendingRequests);
    return null;
  }
};

// Login de Usuario
const loginUser = async (userData) => {
  try {
    const response = await fetch(Global.url + `/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
    }

    const { token, user } = await response.json();
    console.log(response);
    saveToLocalStorage("token", token); // Guarda el token en Local Storage
    saveToLocalStorage("user", user); // Guarda los datos del usuario en Local Storage

    return { token, user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  try {
    const request = await fetch(Global.url + `/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const UserData = await request.json();
    return UserData;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};


// Actualizar un usuario por ID
const putUser = async (id, userData) => {
  try {
    const request = await fetch(Global.url + `/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const updatedUser = await request.json();
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Eliminar un usuario por ID
const deleteUser = async (id) => {
  try {
    const response = await fetch(Global.url + `/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);

    // Guardar solicitud en cola para sincronización
    const pendingRequests = getFromLocalStorage("pendingRequests") || [];
    pendingRequests.push({ type: "DELETE", endpoint: `${Global.url}/user/${id}` });
    saveToLocalStorage("pendingRequests", pendingRequests);
    return null;
  }
};

const switchStatusUser = async (id, value) => {
  if( value == "inactivo"){
    value = "activo"
  }
  else{
    value = "inactivo"
  }

  const data = {
    "status": value
  }

  try {
    const request = await fetch(Global.url + `/user/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedUser = await request.json();
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
 };
 

// Guardar en Local Storage
const saveToLocalStorage = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
 };
 
 // Leer de Local Storage
 const getFromLocalStorage = (key) => {
   const data = localStorage.getItem(key);
   return data ? JSON.parse(data) : null;
 };
 
 // GET: Obtener todos los usuarios
 const getUsers = async () => {
   try {
     const request = await fetch(Global.url + `/users`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const usersData = await request.json();
     // Guardar datos en Local Storage
     saveToLocalStorage("users", usersData);
     return usersData;
   } catch (error) {
     console.error("Error al obtener los usuarios. Usando Local Storage:", error);
     return getFromLocalStorage("users") || [];
   }
 };
 
 // POST: Crear un usuario
 const postUser = async (userData) => {
   try {
     const request = await fetch(Global.url + `/user`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(userData),
     });
     const createdUser = await request.json();
     return createdUser;
   } catch (error) {
     console.error("Error al registrar usuario. Guardando en Local Storage:", error);
     // Guardar solicitud en cola para sincronización
     const pendingRequests = getFromLocalStorage("pendingRequests") || [];
     pendingRequests.push({ type: "POST", endpoint: Global.url + `/user`, data: userData });
     saveToLocalStorage("pendingRequests", pendingRequests);
     return null;
   }
 };
 
 // Sincronizar datos pendientes cuando se restaure la conexión
 const syncPendingRequests = async () => {
   const pendingRequests = getFromLocalStorage("pendingRequests") || [];
   const remainingRequests = [];
 
   for (const request of pendingRequests) {
     try {
       if (request.type === "POST") {
         await fetch(Global.url + request.endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(request.data),
         });
       }
     } catch (error) {
       console.error("Error al sincronizar una solicitud:", error);
       remainingRequests.push(request);
     }
   }
 
   // Actualizar solicitudes pendientes
   saveToLocalStorage("pendingRequests", remainingRequests);
 };
 

 



// Exportar el servicio de usuario
export const UserService = {
   
  ReqPerfil(id) {
    return ReqPerfil(id);
  },
  getUsers(UsersData) {
    return getUsers(UsersData);
  },
  getUserById(id) {
    return getUserById(id);
  },
  postUser(userData) {
    return postUser(userData);
  },
  putUser(id, userData) {
    return putUser(id, userData);
  },
  deleteUser(id) {
    return deleteUser(id);
  },
  syncPendingRequests() {
      return syncPendingRequests();
   },
   getFromLocalStorage(key) {
      return getFromLocalStorage(key);
   },
   switchStatusUser(id, status) {
      return switchStatusUser(id, status);
   },
   registerUser(userData) {
    return registerUser(userData);
  },
  loginUser(userData) {
    return loginUser(userData);
  }
};
