import { productoServices } from "./servicios/product_services.js";
import { ListaServices } from "./servicios/lista_services.js";
import { modalControllers } from "./modal.js";

export class ListaControllers {
  constructor(tabla, titulo) {
    this.tabla = tabla;
    this.titulo = titulo;
    this.listaServicesInstance = new ListaServices();
  }

  async renderLista() {
    try {
      const { listado, usersCantidad } =
        await this.listaServicesInstance.listaUsers();
      const { total } = await productoServices.listaProductos();

      const tituloTabla = `
        <div>
          <div class="row">
            <div class="col-md-12">
              <h2 class="card-header">Usuarios registrados</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 25%;">Users (${usersCantidad})</th>
                    <th style="width: 25%;">Create</th>
                    <th style="width: 25%;">prod (${total})</th>
                    <th style="width: 25%;">Rol</th>
                    <th style="width: 25%;">Accion</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>`;
      this.titulo.innerHTML = tituloTabla;

      listado.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      for (const usuario of listado) {
        const totalProductos = await this.obtenerTotalProductos(usuario._id);
        const usuarioData = {
          username: usuario.username,
          created_at: usuario.created_at,
          role: usuario.role,
          totalProductos: totalProductos,
          id: usuario._id,
        };
        this.tabla.appendChild(this.nuevaLista(usuarioData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  nuevaLista({ username, created_at, role, totalProductos, id }) {
    const fechaCreacion = new Date(created_at);
    const fechaFormateada = `${fechaCreacion
      .getFullYear()
      .toString()
      .slice(-2)}-${("0" + (fechaCreacion.getMonth() + 1)).slice(-2)}-${(
      "0" + fechaCreacion.getDate()
    ).slice(-2)}`;

    const card = document.createElement("div");

    card.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <tbody>
              <tr style="text-align: left;">
                <td style="width: 25%;" >${username}</td>
                <td style="width: 25%;">${fechaFormateada}</td>
                <td style="width: 25%;">${totalProductos}</td>
                <td style="width: 25%;">${role}</td>
                <td style="width: 25%;"><button type="button" class="btn btn-danger" data-userid="${id}" >delete</button></td>
                <td style="width: 25%;"><button type="button" class="btn btn-primary" data-userUp="${id}" >update</button></td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>`;

    card.querySelector("button").addEventListener("click", async (event) => {
      event.preventDefault();
      const userId = event.target.dataset.userid;

      const confirmacion = confirm(
        "¿Estás seguro de que quieres eliminar esta tarjeta?"
      );

      if (confirmacion) {
        try {
          if (role !== "admin") {
            await this.listaServicesInstance.eliminarUser(userId);
            card.remove();
          } else {
            alert("No se puede eliminar un usuario administrador");
          }
        } catch (error) {
          console.error(error);
        }
      }
    });

    card.querySelector("[data-userUp]").addEventListener("click", async (event) => {
      event.preventDefault();
      try{
            this.editarLista(username,role, id );
      
        } catch (error) {
          console.error(error);
        }
        });

    return card;
  }

  async obtenerTotalProductos(userId) {
    const { cantidad } = await this.listaServicesInstance.totalProductos(
      userId
    );
    return cantidad;
  }


  editarLista (newUsername, id) { 
    modalControllers.baseModal();
    const modal = document.getElementById("modal");
    const productoEdicion = modal.querySelector("[data-table]");
    productoEdicion.innerHTML = `
      <div class="text-center">
      <div class="card-header">
          <form action="/api/updateUser/" id="form" enctype="multipart/form-data" method="PUT" data-forma>                
              <p class="parrafo">usuario a editar</p>
                      <div class="form-group">
                      <input class="form-control mt-3 p-2"  placeholder="nombre" type="text" value="${newUsername}" required data-newUsername >
                      </div>
                      <div class="form-group"> 
                      <input class="form-control mt-3 mb-3 p-2"  placeholder="Password" type="password" required data-newPassword>
                      </div>
                      <div>
                      <button type="submit" class="btn btn-primary btn-lg">Editar usuario</button>
                      </div>
          </form>
      </div>
      </div>
  
      `;
  
    productoEdicion.classList.add("modalVisor");
  
    modal.querySelector("[data-forma]").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const newUsername = document.querySelector("[data-newUsername]").value;
      const newPassword = document.querySelector("[data-newPassword]")[0].value;
  
  
      const dataEdit = {
        newUsername,
        newPassword
      };


      await this.listaServicesInstance.updateUser(dataEdit, id)
  
        .then(() => {
          modalControllers.modalProductoEditado();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
  


  }
}
