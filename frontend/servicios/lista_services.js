import { baseURL } from "./product_services.js";

export class ListaServices {
  constructor() {
    this.baseURL = baseURL;
  }

  async listaUsers() {
    const respuesta = await fetch(`${this.baseURL}/api/renderLista`);
    return respuesta.json();
  }

  async eliminarUser(id) {
    await fetch(`${this.baseURL}/api/deleteUser/${id}`, {
      method: "DELETE",
    });
  }

  async totalProductos(id) {
    const respuesta = await fetch(`${this.baseURL}/api/contadorProductos/${id}`);
    return respuesta.json();
  }
}




