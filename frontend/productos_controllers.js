import { modalControllers } from "./modal.js";
import { productoServices } from "./servicios/product_services.js";

const formInit = document.querySelector("[data-table]");

const formProduct = () => {
  formInit.innerHTML = "";
  const card = document.createElement("div");
  const contenido = `
    <div class="card text-center">
        <div class="card-header">
            <p>Agregar producto</p>
        </div>
            <div class="card-body">
                <form id="form" action="/api/createProduct" enctype="multipart/form-data" method="POST" data-form>
                    <div class="form-group">
                        <input class="form-control  p-2" type="file" name="image" placeholder="URL del producto"
                            data-imageUrl required autofocus>
                    </div>
                    <div class="form-group">
                        <input class="form-control mt-3 p-2" type="text" placeholder="Nombre del producto" required
                            data-name>
                    </div>
                    <div class="form-group">
                        <input class="form-control mt-3 mb-3 p-2" type="text" placeholder="Precio del producto"
                            required data-price>
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
    const section = document.getElementById("miMenuDesplegable").value;
    const image = document.querySelector("[data-imageUrl]").files[0];

    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
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

const nuevoProducto = (name, price, imagePath, id) => {
  const card = document.createElement("div");
  const contenido = `
        <div class="container mx-auto mt-4">
            <div class="row">
                <div class="col-md-4 ">
                    <div style="width: 15rem;">
                        <img class="card-img-top" src=${imagePath} alt="">
                            <div class="card-body">
                                <h3 class="card-title">${name}</h3>
                                <p class="card-text">${"$" + price}</p>
                                <a href="#form" class="btn btn-primary" id="${id}" data-edit >Editar</a>
                                <button  class="btn btn-danger" type="button" id="${id}" >eliminar</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  card.innerHTML = contenido;
  card.classList.add("card");

  card.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    try {
      modalControllers.modalEliminar(id);
    } catch (err) {
      console.log(err);
    }
  });

  card.querySelector("[data-edit]").addEventListener("click", (e) => {
    e.preventDefault();
    productoServices
      .detalleProducto(id)
      .then((respuesta) => {
        modalControllers.modalEdicion(name, price, imagePath, id);
      })
      .catch(() => alert("Ocurrio un error"));
  });

  return card;
};

const productoInicio = (name, imagePath) => {
  const card = document.createElement("div");
  const contenido = `
        <div class="container mx-auto mt-4">
            <div class="row">
                <div class="col-md-4 ">
                    <div style="width: 15rem;">
                        <img class="card-img-top" src=${imagePath} alt="">
                            <div class="card-body">
                                <h3 class="card-title">${name}</h3>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  card.innerHTML = contenido;
  card.classList.add("card");

  return card;
};

//asociar productos con la seccion correspondiente
const productoPosters = document.querySelector("[data-posters]");
const productoConsolas = document.querySelector("[data-consolas]");
const productoDiversos = document.querySelector("[data-diversos]");
//renderizar producto
const render = async () => {
  try {
    const listaProductos = await productoServices.listaProductos();
    listaProductos.forEach((elemento) => {
      if (elemento.section === "opcion1") {
        productoPosters.appendChild(
          nuevoProducto(
            elemento.name,
            elemento.price,
            elemento.imagePath,
            elemento._id
          )
        );
      } else if (elemento.section === "opcion2") {
        productoConsolas.appendChild(
          nuevoProducto(
            elemento.name,
            elemento.price,
            elemento.imagePath,
            elemento._id
          )
        );
      } else if (elemento.section === "opcion3") {
        productoDiversos.appendChild(
          nuevoProducto(
            elemento.name,
            elemento.price,
            elemento.imagePath,
            elemento._id
          )
        );
      }
    });
  } catch (erro) {
    console.log(erro);
  }
};

//render productos pagina ppal
const renderInit = async () => {
  try {
    const listaProductos = await productoServices.renderInicio();
    listaProductos.forEach((elemento) => {
      if (elemento.section === "opcion1") {
        productoPosters.appendChild(
          productoInicio(elemento.name, elemento.imagePath)
        );
      } else if (elemento.section === "opcion2") {
        productoConsolas.appendChild(
          productoInicio(elemento.name, elemento.imagePath)
        );
      } else if (elemento.section === "opcion3") {
        productoDiversos.appendChild(
          productoInicio(elemento.name, elemento.imagePath)
        );
      }
    });
  } catch (erro) {
    console.log(erro);
  }
};

//editar producto

const productoEdicion = document.querySelector("[data-table]");

const editProduct = (name, price, imagePath, id) => {
  productoEdicion.innerHTML = "";
  const card = document.createElement("div");
  /*const contenido = `
    <div class="card text-center">
    <div class="card-header">
    <img class="img-card-top mx-auto" style="width:45vw;" src=${imagePath} alt="">
        <form action="/api/updateProduct/" id="form" enctype="multipart/form-data" method="PUT" data-forma>                
            <p class="parrafo">Producto a editar</p>
                    <div class="form-group">
                    <input class="form-control mt-3 p-2"  placeholder="nombre" type="text" value="${name}" required data-nombre >
                    </div>
                    <div class="form-group"> 
                    <input class="form-control mt-3 mb-3 p-2"  placeholder="precio" type="text"value="${price}" required data-precio>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-primary btn-lg">Editar producto</button>
                    </div>
        </form>
    </div>
    </div>

    `*/
  //codigo para actualizar imagen en s3 y mongoDB
  const contenido = `
    <div class="card text-center">
    <div class="card-header">
    <img class="img-card-top mx-auto" style="width:45vw;" src=${imagePath} alt="">
        <form action="/api/updateProduct/" id="form" enctype="multipart/form-data" method="PUT" data-forma>                
            <p class="parrafo">Producto a editar</p>
                <div class="form-group"> 
                    <input class="form-control p-2"  placeholder="imageUrl" type="file" name="imagePath" value="${imagePath}" required data-image autofocus >
                    <input type="hidden" class="oldImagePath" name="oldImagePath" value="${imagePath}" data-oldPath>
                </div>
                    <div class="form-group">
                    <input class="form-control mt-3 p-2"  placeholder="nombre" type="text" value="${name}" required data-nombre >
                    </div>
                    <div class="form-group"> 
                    <input class="form-control mt-3 mb-3 p-2"  placeholder="precio" type="text"value="${price}" required data-precio>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-primary btn-lg">Editar producto</button>
                    </div>
        </form>
    </div>
    </div>

    `;

  card.innerHTML = contenido;
  card.classList.add("modalVisor");
  productoEdicion.appendChild(card);

  card.querySelector("[data-forma]").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const imagePath = document.querySelector("[data-image]").files[0];
    const oldImagePath = document.querySelector("[data-oldPath]").value;

    const dataEdit = new FormData();
    dataEdit.append("name", name);
    dataEdit.append("price", price);
    dataEdit.append("imagePath", imagePath);
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
  return card;
};

//renderizar producto editado
const renderProductEdit = async (id) => {
  try {
    const listaProductos = await productoServices.listaProductos();

    listaProductos.forEach((elemento) => {
      if (elemento._id === id) {
        productoEdicion.appendChild(
          editProduct(
            elemento.name,
            elemento.price,
            elemento.imagePath,
            elemento._id
          )
        );
      }
    });
  } catch (erro) {
    console.log(erro);
  }
};

export const controllers = {
  nuevoProducto,
  render,
  renderInit,
  editProduct,
  renderProductEdit,
  formProduct,
};
