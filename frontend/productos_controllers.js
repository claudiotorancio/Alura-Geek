import { modalControllers } from "./modal.js";
import { productoServices } from "./servicios/product_services.js";

// Mostrar formulario desde boton save products
const formInit = document.querySelector("[data-table]");

const formProduct = () => {
  formInit.innerHTML = "";
  const card = document.createElement("div");
  const contenido = `
    <div class="text-center">
        <div class="card-header">
            <p>Agregar producto</p>
        </div>
            <div class="card-body">
                <form id="form" action="/api/createProduct" enctype="multipart/form-data" method="POST" data-form>
                    <div class="form-group">
                        <input class="form-control p-2"  type="file" name="image" 
                            data-imageUrl  required autofocus>
                    </div>
                    <div class="form-group">
                        <input class="form-control mt-3 p-2" type="text" placeholder="Nombre del producto" required
                            data-name>
                    </div>
                    <div class="form-group">
                        <input class="form-control mt-3 mb-3 p-2" type="text" placeholder="Precio del producto"
                            required data-price>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control mt-3 mb-3 p-2" type="text" placeholder="Descripcion"
                            required data-description></textarea>
                    </div>
                        <p for="miMenuDesplegable">Seccion</p>
                    <div class="form-group">
                        <select class="form-control  mb-3 p-2" id="miMenuDesplegable" name="opcion">
                            <option value="opcion1">Posters</option>
                            <option value="opcion2">Consolas</option>
                            <option value="opcion3">Diversos</option>
                        </select>
                    </div>
                        <button type="submit" class="btn btn-primary btn-lg">Agregar</button>
                </form>
            </div>
    </div>
    `;
  card.innerHTML = contenido;
  card.classList.add("modalVisor");
  formInit.appendChild(card);

  card.querySelector("[data-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const description = document.querySelector("[data-description]").value;
    const section = document.getElementById("miMenuDesplegable").value;
    const image = document.querySelector("[data-imageUrl]").files[0];

    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("description", description);
    productData.append("section", section);
    productData.append("image", image);

    const user = JSON.parse(sessionStorage.getItem("user")) || null;
    if (user) {
      productoServices
        .crearProducto(productData)
        .then(() => {
          modalControllers.modalProductoCreado();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      modalControllers.modalErrorRegistro();
    }
  });
  return card;
};

const nuevoProducto = (description,name, imagePath, price,  id) => {
  const card = document.createElement("div");
  const contenido = `
  <div class="container mx-auto mt-4">
  
    
      <div class="img-card">
        <img class="card-img-top" src=${imagePath} alt="">
      </div>
     
      <div class="card-body">
        <a href="#">ver producto </a>
        <h3 class="card-title">${name}</h3>
        <p class="card-text">${"$" + price}</p>
        <a href="#form" class="btn btn-primary" id="${id}" data-edit >Editar</a>
        <button  class="btn btn-danger" type="button" id="${id}" >eliminar</button>
      </div>

</div>

    `;

  card.innerHTML = contenido;
  card.classList.add("card");

  card.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    try {
      mostrarProducto(imagePath, name, description);
    } catch (err) {
      console.log(err);
    }
  });

  card.querySelector("button").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      // Llamas a modalEliminar y esperas su completación
      await modalControllers.modalEliminar(id);
    } catch (err) {
      console.log(err);
    }
  });

  card.querySelector("[data-edit]").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await productoServices.detalleProducto(id);
      editProduct(name, price, imagePath, description, id);
    } catch (error) {
      console.error("Error al obtener el detalle del producto:", error);
      alert(
        "Ocurrió un error al obtener el detalle del producto. Por favor, intenta nuevamente."
      );
    }
  });

  return card;
};

//renderizar producto

const render = async () => {
  try {
    const listaProductos = await productoServices.listaProductos();
    const { products } = listaProductos;

    // Objeto para almacenar los productos por sección
    const productosPorSeccion = {
      opcion1: [],
      opcion2: [],
      opcion3: []
    };

    // Dividir los productos por sección
    products.forEach((elemento) => {
      productosPorSeccion[elemento.section].push(elemento);
    });
  
    // Renderizar los primeros tres productos en cada sección
    for (const [seccion, productos] of Object.entries(productosPorSeccion)) {

      const primerosTresProductos = productos
      
      const contenedorProductos = document.querySelector(`[data-${seccion}]`);
    
      primerosTresProductos.forEach((producto) => {
      
        contenedorProductos.appendChild(
          nuevoProducto(
            producto.description,
            producto.name,
            producto.imagePath,
            producto.price,
            producto._id
          )
        );
      });
    }

    // Renderizar el resto de los productos en otra estructura dinámica
  
  } catch (error) {
    console.log(error);
  }
};

const editProduct = (name, price, imagePath, description, id) => {
  modalControllers.baseModal();
  const modal = document.getElementById("modal");
  const productoEdicion = modal.querySelector("[data-table]");
  productoEdicion.innerHTML = `
    <div class="text-center">
    <div class="card-header">
    <img class="img-card-top mx-auto" style="width:45vw;" src=${imagePath} alt="">
        <form action="/api/updateProduct/" id="form" enctype="multipart/form-data" method="PUT" data-forma>                
            <p class="parrafo">Producto a editar</p>
                <div class="form-group"> 
                    <input class="form-control p-2"  placeholder="imageUrl" type="file" name="imagePath" value="${imagePath}" data-image autofocus >
                    <input type="hidden" class="oldImagePath" name="oldImagePath" value="${imagePath}" data-oldPath>
                </div>
                    <div class="form-group">
                    <input class="form-control mt-3 p-2"  placeholder="nombre" type="text" value="${name}" required data-nombre >
                    </div>
                    <div class="form-group"> 
                    <input class="form-control mt-3 mb-3 p-2"  placeholder="precio" type="text"value="${price}" required data-precio>
                    </div>
                    <div class="form-group"> 
                    <textarea class="form-control mt-3 mb-3 p-2"  placeholder="Descripcion" type="text" required data-description>${description}</textarea>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-primary btn-lg">Editar producto</button>
                    </div>
        </form>
    </div>
    </div>

    `;

  productoEdicion.classList.add("modalVisor");

  modal.querySelector("[data-forma]").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const description = document.querySelector("[data-description]").value;
    const imagePath = document.querySelector("[data-image]").files[0];
    const oldImagePath = document.querySelector("[data-oldPath]").value;

    const dataEdit = new FormData();
    dataEdit.append("imagePath", imagePath);
    dataEdit.append("name", name);
    dataEdit.append("price", price);
    dataEdit.append("description", description);
    dataEdit.append("oldImagePath", oldImagePath);

    productoServices
      .actualizarProducto(dataEdit, id)
      .then(() => {
        modalControllers.modalProductoEditado();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};




const mostrarProducto = (imagePath, name, description) => {
  modalControllers.baseModal();
  const modal = document.getElementById("modal");
  const mostrarProducto = modal.querySelector("[data-table]");
  mostrarProducto.innerHTML = `
        <div class="contenido_container">
            <div class="row">
                <div class="col-md-6 mx-auto ">                
                      <img class="card-img-top" src=${imagePath} alt="">         
                </div>
                <div class="col-md-6 mx-auto ">
                    <div class="card-body">
                      <h3 class="card-title">${name}</h3>
                      <br>
                      <h7 class="card-text" style="overflow: auto;">${description}</h7>
                    </div>
                </div
            </div>
        </div>
    `;

  mostrarProducto.classList.add("modalVisor");
};

export const controllers = {
  nuevoProducto,
  render,
  editProduct,
  formProduct,
  mostrarProducto,
};
