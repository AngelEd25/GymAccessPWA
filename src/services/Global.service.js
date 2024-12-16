

const usePendingRequest = async () => {
   const remainingRequests = [];

      const pendingRequests = localStorage.getItem("pendingRequests");
      if (pendingRequests == null || pendingRequests == undefined) {
         console.log(`No hay solicitudes pendientes.`);
      
      }
      else{
         console.log()
         for (const request of pendingRequests) {

           try {
             await fetch(request.endpoint, {
               method: request.type,
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(request.data),
             });
           } catch (error) {
             console.error("Error al sincronizar una solicitud:", error);
             remainingRequests.push(request); // Si falla, mantener la solicitud en cola
           }
         }
       
         // Actualizar solicitudes pendientes
         saveToLocalStorage("pendingRequests", remainingRequests);
       
         if (remainingRequests.length === 0) {
           console.log("¡Todas las solicitudes pendientes fueron sincronizadas!");
         }

      }
      return pendingRequests;
 };

      const getFromLocalStorage = (key) => {
         const data = localStorage.getItem(key);
         return data ? JSON.parse(data) : null;
      };
      
      const saveToLocalStorage = (key, data) => {
         localStorage.setItem(key, JSON.stringify(data));
      };
 

 export const GlobalService = {
   
   usePendingRequest() {
     return usePendingRequest();
   },
}