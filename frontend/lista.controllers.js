import { listaServices } from "./servicios/lista_services.js";

const nuevaLista = ( username, created_at, role, totalProductos, id) => {
  const fechaCreacion = new Date(created_at);
  const fechaFormateada = `${fechaCreacion.getFullYear().toString().slice(-2)}-${fechaCreacion.getMonth() + 1}-${fechaCreacion.getDate()}`;

  const card = document.createElement("div");
 

  const contenido = `
    <div class="row">
        <div class="col-md-12">
            <table class="table">
                <tbody>
                    <tr style="text-align: left;">
                        <td style="width: 25%;" >${username}</td>
                        <td style="width: 25%;">${fechaFormateada}</td>
                        <td style="width: 25%;">${totalProductos}</td>
                        <td style="width: 25%;">${role}</td>
                        <td style="width: 25%;"><button type="button" class="btn btn-danger" data-userid="${id}" >cut</button></td>
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
        // Verificar si el usuario autenticado es administrador
        if (role !== 'admin') {
          await listaServices.eliminarUser(userId);
          // Eliminar la fila de la tabla después de eliminar el usuario
          card.remove();
        } else {
          alert('No se puede eliminar un usuario administrador');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  return card;
};


const tabla = document.querySelector("[data-lista]");
const titulo = document.querySelector("[data-titulo]");

const renderLista = async () => {
  try {
    const respuesta = await listaServices.listaUsers();
    const lista = respuesta.listado; // Acceder al arreglo de usuarios

    lista.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const tituloTabla = `
      <div>
      <div class="row">
        <div class="col-md-12">
        <table class="table">
      <thead>
      <tr>
        <th style="width: 25%;">User</th>
        <th style="width: 25%;">Create</th>
        <th style="width: 25%;">prod</th>
        <th style="width: 25%;">Rol</th>
        <th style="width: 25%;">Accion</th>
      </tr>
    </thead>
    </table>
    </div>
    </div>
    </div>`;
    
      titulo.innerHTML = tituloTabla;

      for (const usuario of lista) {
        // Obtener la cantidad de productos para este usuario
        const productosCantidad = await listaServices.totalProductos(usuario._id);
        const totalProductos = productosCantidad.cantidad;
      // Llamar a nuevaLista con la cantidad de productos obtenida
      tabla.appendChild(
        nuevaLista(
          usuario.username,
          usuario.created_at,
          usuario.role,
          totalProductos,
          usuario._id
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const listaControllers = {
  renderLista,
};
