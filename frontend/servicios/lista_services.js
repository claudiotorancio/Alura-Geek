import { baseURL } from "./product_services.js";

export class ListaServices {
  constructor() {
    this.baseURL = baseURL;
  }

  getUser = async (id) => {
    console.log(`getUser id: ${id}`);
    try {
      const respuesta = await fetch(`${this.baseURL}/api/getUser/${id}`);
  
      const data = await respuesta.json();
      // Acceder a user desde el objeto de respuesta
      const user = data.user;
      
      console.log(`getUser user: ${user}`);
      // Retornar user si es necesario
      return {user};
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error; // Propagar el error para manejarlo en otro lugar si es necesario
    }
  };
  


  listaUsers = async () => {
    try {
      const respuesta = await fetch(`${this.baseURL}/api/renderLista`);
      return respuesta.json();
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
      throw error;
    }
  };

  eliminarUser = async (id) => {
    try {
      await fetch(`${this.baseURL}/api/deleteUser/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  };

  updateUser = async (dataUser, id) => {
    try {
      await fetch(`${this.baseURL}/api/updateUser/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify (dataUser),
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  };

  totalProductos = async (id) => {
    try {
      const respuesta = await fetch(`${this.baseURL}/api/contadorProductos/${id}`);
      return respuesta.json();
    } catch (error) {
      console.error("Error al obtener el total de productos:", error);
      throw error;
    }
  };
}
