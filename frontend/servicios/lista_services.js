import { baseURL } from "./product_services.js";

export class ListaServices {
  constructor() {
    this.baseURL = baseURL;
  }

  getUser = async (id) => {
    try {
      const respuesta = await fetch(`${this.baseURL}/api/getUser/${id}`);
      return respuesta.json();
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
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
