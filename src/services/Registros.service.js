import { Global } from "../helpers/global";

// Guardar en Local Storage
const saveToLocalStorage = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
};

// Leer de Local Storage
const getFromLocalStorage = (key) => {
   const data = localStorage.getItem(key);
   return data ? JSON.parse(data) : null;
};

// GET: Obtener todas las tarjetas
const getRegistros = async () => {
   try {
     const request = await fetch(Global.url + `/access`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const registrosData = await request.json();
     // Guardar datos en Local Storage
     saveToLocalStorage("registros", registrosData);
     return registrosData;
   } catch (error) {
     console.error("Error al obtener los registros. Usando Local Storage:", error);
     return getFromLocalStorage("registros") || [];
   }
};

// POST: Crear una tarjeta
const postRegistro = async (cardData) => {
   try {
     const request = await fetch(Global.url + `/access`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(cardData),
     });
     const createdRegistro = await request.json();
     return createdRegistro;
   } catch (error) {
     console.error("Error al registrar. Guardando en Local Storage:", error);
     // Guardar solicitud en cola para sincronización
     const pendingRequests = getFromLocalStorage("pendingRequests") || [];
     pendingRequests.push({ type: "POST", endpoint: "/registros", data: cardData });
     saveToLocalStorage("pendingRequests", pendingRequests);
     return null;
   }
};

// GET: Obtener una tarjeta por ID
const getRegistroById = async (id) => {
   try {
     const request = await fetch(Global.url + `/acccess/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const cardData = await request.json();
     return cardData;
   } catch (error) {
     console.error("Error al obtener la tarjeta:", error);
     throw error;
   }
};

// PUT: Actualizar una tarjeta por ID
const putRegistro = async (id, cardData) => {
   try {
     const request = await fetch(Global.url + `/access/${id}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(cardData),
     });
     const updatedRegistro = await request.json();
     return updatedRegistro;
   } catch (error) {
     console.error("Error al actualizar la tarjeta:", error);
     throw error;
   }
};

// DELETE: Eliminar una tarjeta por ID
const deleteRegistro = async (id) => {
   try {
     const request = await fetch(Global.url + `/access/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const result = await request.json();
     return result;
   } catch (error) {
     console.error("Error al eliminar la tarjeta:", error);
     throw error;
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

// Exportar el servicio de tarjetas
export const RegistroService = {
  getRegistros() {
    return getRegistros();
  },
  getRegistroById(id) {
    return getRegistroById(id);
  },
  postRegistro(cardData) {
    return postRegistro(cardData);
  },
  putRegistro(id, cardData) {
    return putRegistro(id, cardData);
  },
  deleteRegistro(id) {
    return deleteRegistro(id);
  },
  syncPendingRequests() {
    return syncPendingRequests();
  },
};
