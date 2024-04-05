
import { baseURL } from "./product_services.js";

const listaUsers = async () =>
  await fetch(`${baseURL}/api/renderLista`).then((respuesta) =>
    respuesta.json()
  );

  const eliminarUser = async (id) => {
    await fetch(`${baseURL}/api/deleteUser/${id}`, {
      method: "DELETE",
    });
  };

  const totalProductos = async (id) =>
  await fetch(`${baseURL}/api/contadorProductos/${id}`).then((respuesta) =>
    respuesta.json()
  );


export const listaServices = {
  listaUsers,
  eliminarUser,
  totalProductos
};
