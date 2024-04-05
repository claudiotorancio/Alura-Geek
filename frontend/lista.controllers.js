
import { listaServices } from "./servicios/lista_services.js";

const nuevaLista = (username, created_at, id, totalProductos) => {

  const totalProductos = listaServices.totalProductos()
  const fechaCreacion = new Date(created_at);
  const fechaFormateada = fechaCreacion.toLocaleString();

  const card = document.createElement("div");
  card.classList.add("mx-auto", "mt-4");

  const contenido = `
    <div class="row">
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Creación</th>
                        <th>Cant.prod</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${username}</td>
                        <td>${fechaFormateada}</td>
                        <td>${totalProductos}</td>
                        <td><button type="button" class="btn btn-danger" data-userid="${id}" >Eliminar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  `;

  card.innerHTML = contenido;

  // Agrega un evento de clic al botón "Eliminar"
  card.querySelector("button").addEventListener("click", async (event) => {
    event.preventDefault();
    const userId = event.target.dataset.userid;

    // Mostrar una alerta para confirmar la eliminación
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta tarjeta?");

    if (confirmacion) {
        try {
            await listaServices.eliminarUser(userId);
            // Eliminar la fila de la tabla después de eliminar el usuario
            card.remove();
        } catch (error) {
            console.error(error);
        }
    }
});

  return card;
};





const tabla = document.querySelector("[data-lista]");
const renderLista = async () => {
  try {
    const respuesta = await listaServices.listaUsers();
    const lista = respuesta.listado; // Acceder al arreglo de usuarios

    lista.forEach(async (elemento) => {
      try {
        // Realizar una llamada para obtener el total de productos para este usuario
        const totalProductosRespuesta = await listaServices.totalProductos(elemento._id);
        const totalProductos = totalProductosRespuesta.totalProductos;

        // Agregar la fila a la tabla
        tabla.appendChild(
          nuevaLista(
            elemento.username,
            elemento.created_at,
            elemento._id,
            totalProductos
          )
        );
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const listaControllers = {
  renderLista
};


