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
const getCards = async () => {
   try {
     const request = await fetch(Global.url + `/cards`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const cardsData = await request.json();
     // Guardar datos en Local Storage
     saveToLocalStorage("cards", cardsData);
     return cardsData;
   } catch (error) {
     console.error("Error al obtener las tarjetas. Usando Local Storage:", error);
     return getFromLocalStorage("cards") || [];
   }
};

// POST: Crear una tarjeta
const postCard = async (cardData) => {
  console.log(JSON.stringify(cardData));

   try {
     const request = await fetch(Global.url + `/card`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(cardData),
     });
     const createdCard = await request.json();
     return createdCard;
    

   } catch (error) {
     console.error("Error al registrar tarjeta. Guardando en Local Storage:", error);
     // Guardar solicitud en cola para sincronización
     const pendingRequests = getFromLocalStorage("pendingRequests") || [];
     pendingRequests.push({ type: "POST", endpoint: Global.url + `/card`, data: cardData });
     saveToLocalStorage("pendingRequests", pendingRequests);
     return null;
   }

   

};

// GET: Obtener una tarjeta por ID
const getCardById = async (id) => {
   try {
     const request = await fetch(Global.url + `/card/${id}`, {
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
const putCard = async (id, cardData) => {
   try {
     const request = await fetch(Global.url + `/card/${id}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(cardData),
     });
     const updatedCard = await request.json();
     return updatedCard;
   } catch (error) {
     console.error("Error al actualizar la tarjeta:", error);
     throw error;
   }
};

// PUT: Actualizar una tarjeta por ID
const switchStatusCard = async (id, value) => {
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
    const request = await fetch(Global.url + `/card/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedCard = await request.json();
    return updatedCard;
  } catch (error) {
    console.error("Error al actualizar la tarjeta:", error);
    throw error;
  }
};

// DELETE: Eliminar una tarjeta por ID
const deleteCard = async (id) => {
   try {
     const request = await fetch(Global.url + `/card/${id}`, {
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
export const CardService = {
  getCards() {
    return getCards();
  },
  getCardById(id) {
    return getCardById(id);
  },
  postCard(cardData) {
    return postCard(cardData);
  },
  putCard(id, cardData) {
    return putCard(id, cardData);
  },
  deleteCard(id) {
    return deleteCard(id);
  },
  syncPendingRequests() {
    return syncPendingRequests();
  },
  switchStatusCard(id, status){
    return switchStatusCard(id, status);  // Add your function here to switch card status.  // For example, fetch the API endpoint and update the status in the database.  // You might need to handle errors and edge cases.  // You can implement this function in your CardService.js file.  // Please note that this is a placeholder and will require a real implementation.  // You can find the API endpoint and the logic to switch the status in the API documentation.  // Also, make sure to handle any errors that may occur during the switch status request.  // Make sure to call this function when you want to switch the status of a card.  // You can call this function from the CardService.js file.  // Please note that this is a placeholder and will require a real implementation.  // You can find the API endpoint and the logic to switch the status in the API documentation.  // Also, make sure to handle any errors that may occur during
  }
};
