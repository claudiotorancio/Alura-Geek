import { ListaServices } from "./servicios/lista_services.js";
 import { productoServices } from "./servicios/product_services.js";

 export class ListaControllers {
  constructor(tabla, titulo) {
    this.tabla = tabla;
    this.titulo = titulo;
    this.listaServicesInstance = new ListaServices();
  }

  async renderLista() {
    try {
      const { listado, usersCantidad } = await this.listaServicesInstance.listaUsers();
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
      listado.forEach(usuario  => {
   
        this.tabla.appendChild(this.nuevaLista(usuario));
        console.log(this.nuevaLista(usuario))
      });
    } catch (error) {
      console.log(error);
    }
  }

 async nuevaLista(usuario) {
    const { username, created_at, role, _id } = usuario;
    const fechaCreacion = new Date(created_at);
    const fechaFormateada = `${fechaCreacion.getFullYear().toString().slice(-2)}-${("0" + (fechaCreacion.getMonth() + 1)).slice(-2)}-${("0" + fechaCreacion.getDate()).slice(-2)}`;

    const card = document.createElement("div");

    const totalProductos = await this.obtenerTotalProductos(usuario._id);
   

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
                <td style="width: 25%;"><button type="button" class="btn btn-danger" data-userid="${_id}" >cut</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;

    card.innerHTML = contenido;

    card.querySelector("button").addEventListener("click", async (event) => {
      event.preventDefault();
      const userId = event.target.dataset.userid;

      const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta tarjeta?");
      if (confirmacion) {
        try {
          if (role !== 'admin') {
            await this.listaServicesInstance.eliminarUser(userId);
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
  }

  async obtenerTotalProductos(user_id) {
    const  {cantidad}  = await this.listaServicesInstance.totalProductos(user_id);
    
    return cantidad;
  }
  
}


// export class ListaControllers {
//   constructor(tabla, titulo) {
//     this.tabla = tabla;
//     this.titulo = titulo;
//   }

//   async renderLista() {
//     try {


//       const listaServicesInstance = new ListaServices();
//       const respuesta = await listaServicesInstance.listaUsers(); // Utiliza await aquí
//       const lista = respuesta.listado;
//       const cantidad = respuesta.usersCantidad;

//       const mostrarCantidad = await productoServices.listaProductos();
//       const { total } = mostrarCantidad;

//       lista.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//       const tituloTabla = `
//         <div>
//           <div class="row">
//             <div class="col-md-12">
//               <h2 class="card-header">Usuarios registrados</H2>
//               <table class="table">
//                 <thead>
//                   <tr>
//                     <th style="width: 25%;">Users (${cantidad})</th>
//                     <th style="width: 25%;">Create</th>
//                     <th style="width: 25%;">prod (${total})</th>
//                     <th style="width: 25%;">Rol</th>
//                     <th style="width: 25%;">Accion</th>
//                   </tr>
//                 </thead>
//               </table>
//             </div>
//           </div>
//         </div>`;

//       this.titulo.innerHTML = tituloTabla;

//       for (const usuario of lista) {
//         // Utiliza listaServicesInstance en lugar de listaServices aquí
//         const productosCantidad = await listaServicesInstance.totalProductos(usuario._id);
//         const totalProductos = productosCantidad.cantidad;

//         this.tabla.appendChild(
//           this.nuevaLista(
//             usuario.username,
//             usuario.created_at,
//             usuario.role,
//             totalProductos,
//             usuario._id
//           )
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   nuevaLista(username, created_at, role, totalProductos, id) {
//     const fechaCreacion = new Date(created_at);
//     const fechaFormateada = `${fechaCreacion.getFullYear().toString().slice(-2)}-${("0" + (fechaCreacion.getMonth() + 1)).slice(-2)}-${("0" + fechaCreacion.getDate()).slice(-2)}`;

//     const card = document.createElement("div");

//     const contenido = `
//       <div class="row">
//         <div class="col-md-12">
//           <table class="table">
//             <tbody>
//               <tr style="text-align: left;">
//                 <td style="width: 25%;" >${username}</td>
//                 <td style="width: 25%;">${fechaFormateada}</td>
//                 <td style="width: 25%;">${totalProductos}</td>
//                 <td style="width: 25%;">${role}</td>
//                 <td style="width: 25%;"><button type="button" class="btn btn-danger" data-userid="${id}" >cut</button></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>`;

//     card.innerHTML = contenido;

//     card.querySelector("button").addEventListener("click", async (event) => {
//       event.preventDefault();
//       const userId = event.target.dataset.userid;

//       const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta tarjeta?");

//       if (confirmacion) {
//         try {
//           const listaServicesInstance = new ListaServices();
//           if (role !== 'admin') {
//             await listaServicesInstance.eliminarUser(userId);
//             card.remove();
//           } else {
//             alert('No se puede eliminar un usuario administrador');
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     });

//     return card;
//   }
// }
