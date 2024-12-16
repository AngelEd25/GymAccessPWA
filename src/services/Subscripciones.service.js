import { Global } from "../helpers/global";


// Obtener un subscripcion por ID
const getSubscriptionById = async (id) => {
  try {
    const request = await fetch(Global.url + `/subscriptions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const SubscriptionData = await request.json();
    return SubscriptionData;
  } catch (error) {
    console.error("Error al obtener el subscripcion:", error);
    throw error;
  }
};


// Actualizar un subscripcion por ID
const putSubscription = async (id, subscriptionsData) => {
  try {
    const request = await fetch(Global.url + `/subscriptions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionsData),
    });
    const updatedSubscription = await request.json();
    return updatedSubscription;
  } catch (error) {
    console.error("Error al actualizar el subscripcion:", error);
    throw error;
  }
};

// Eliminar un subscripcion por ID
const deleteSubscription = async (id) => {
  try {
    const request = await fetch(Global.url + `/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    return result;
  } catch (error) {
    console.error("Error al eliminar el subscripcion:", error);
    throw error;
  }
};

const switchStatusSubscription = async (id, value) => {
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
    const request = await fetch(Global.url + `/subscriptions/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedSubscription = await request.json();
    return updatedSubscription;
  } catch (error) {
    console.error("Error al actualizar el subscripcion:", error);
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
 
 // GET: Obtener todos los subscripcions
 const getSubscriptions = async () => {
   try {
     const request = await fetch(Global.url + `/subscriptions`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const subscriptionssData = await request.json();
     // Guardar datos en Local Storage
     saveToLocalStorage("subscriptionss", subscriptionssData);
     return subscriptionssData;
   } catch (error) {
     console.error("Error al obtener las subscripciones Usando Local Storage:", error);
     return getFromLocalStorage("subscriptions") || [];
   }
 };
 
 // POST: Crear un subscripcion
 const postSubscription = async (subscriptionsData) => {
    console.log(subscriptionsData);
    console.log(JSON.stringify(subscriptionsData));
   try {
     const request = await fetch(Global.url + `/subscriptions`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(subscriptionsData),
     });
     const createdSubscription = await request.json();
     return createdSubscription;
   } catch (error) {
     console.error("Error al registrar subscripcion. Guardando en Local Storage:", error);
     // Guardar solicitud en cola para sincronización
     const pendingRequests = getFromLocalStorage("pendingRequests") || [];
     pendingRequests.push({ type: "POST", endpoint: "/subscriptions", data: subscriptionsData });
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
 



// Exportar el servicio de subscripcion
export const SubscriptionService = {
   
  ReqPerfil(id) {
    return ReqPerfil(id);
  },
  getSubscriptions(SubscriptionsData) {
    return getSubscriptions(SubscriptionsData);
  },
  getSubscriptionById(id) {
    return getSubscriptionById(id);
  },
  postSubscription(subscriptionsData) {
    return postSubscription(subscriptionsData);
  },
  putSubscription(id, subscriptionsData) {
    return putSubscription(id, subscriptionsData);
  },
  deleteSubscription(id) {
    return deleteSubscription(id);
  },
  syncPendingRequests() {
      return syncPendingRequests();
   },
   getFromLocalStorage(key) {
      return getFromLocalStorage(key);
   },
   switchStatusSubscription(id, status) {
      return switchStatusSubscription(id, status);
   },
};
