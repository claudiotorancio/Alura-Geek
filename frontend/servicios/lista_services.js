import { baseURL } from "./product_services.js";

export class ListaServices {
  constructor() {
    this.baseURL = baseURL;
  }

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

  updateUser = async (user, id) => {
    
    try {
      await fetch(`${this.baseURL}/api/updateUser/${id}`, {
        method: "PUT",
        body: user
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
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
