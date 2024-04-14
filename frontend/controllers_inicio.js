import { productoServices } from "./servicios/product_services.js";
import { controllers } from "./productos_controllers.js";

const productoInicio = (description, name, imagePath) => {
  const card = document.createElement("div");
  const contenido = `
  
          <div class="container mx-auto mt-4">
    
      
          <div class="img-card">
            <img class="card-img-top" src=${imagePath} alt="">
          </div>
         
          <div class="card-body">
          <a href="#">ver producto </a>
            <h3 class="card-title">${name}</h3>
            
           
          </div>
    
    </div>
      `;

  card.innerHTML = contenido;
  card.classList.add("card");

  card.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    try {
      controllers.mostrarProducto(imagePath, name, description);
    } catch (err) {
      console.log(err);
    }
  });

  return card;
};

const renderInit = async () => {
  try {
    const listaProductos = await productoServices.renderInicio();
    const products = listaProductos;

    // Objeto para almacenar los productos por secciÃ³n
    const productosPorSeccion = {
      opcion1: [],
      opcion2: [],
      opcion3: [],
    };

    // Dividir los productos por secciÃ³n
    products.forEach((elemento) => {
      productosPorSeccion[elemento.section].push(elemento);
    });

    // Renderizar solo los primeros tres productos en cada secciÃ³n por defecto
    for (const [seccion, productos] of Object.entries(productosPorSeccion)) {
      const contenedorProductos = document.querySelector(`[data-${seccion}]`);
      contenedorProductos.innerHTML = ""; // Limpiar contenido existente

      const primerosTresProductos = productos.slice(0, 3);
      primerosTresProductos.forEach((producto) => {
        contenedorProductos.appendChild(
          productoInicio(
            
            producto.description,
            producto.name,
            producto.imagePath,
            producto.price,
            producto._id
          )
        );
      });
    }
  } catch (error) {
    console.error(error);
  }
};

document.querySelectorAll(".categoria").forEach((categoria) => {
  const categoriaBtn = categoria.querySelector("a");
  const opcion = categoriaBtn.getAttribute("id");
  const contenedorProductos = document.querySelector(`[data-${opcion}]`);
  let mostrarTodos = false; // Variable para mantener el estado de visualizaciÃ³n

  categoriaBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del enlace

    try {
      // Si aÃºn no se han mostrado todos los productos
      if (!mostrarTodos) {
        contenedorProductos.classList.add("allProducts");

        const respuesta = await productoServices.listaProductos();
        const { usuarioHaIniciadoSesion, usuarioAdmin} = respuesta; // Acceder al arreglo de usuarios

        let render;

        if (!usuarioAdmin ) {
          render = productoInicio;
        } else {
          render = controllers.nuevoProducto;
        }

        const listaProductos = await productoServices.renderInicio();
        const products = listaProductos.filter(
          (producto) => producto.section === opcion
        );

        contenedorProductos.innerHTML = ""; // Limpiar contenido existente
        products.forEach((producto) => {
          contenedorProductos.appendChild(
            render(
                producto.description,
                producto.name,
                producto.imagePath,
                producto.price,
                producto._id
            )
          );
        });

        const tarjetas = contenedorProductos.querySelectorAll(".card");
        tarjetas.forEach((tarjeta) => {
          tarjeta.classList.add("allCard");
        });

        const imagen = contenedorProductos.querySelectorAll(".img-card");
        imagen.forEach((tarjeta) => {
          tarjeta.classList.add("img-allCard");
        });

        mostrarTodos = true; // Cambiar el estado a mostrar todos

         // Desplazar la pÃ¡gina hacia arriba
         window.scrollTo({ top: 0, behavior: "smooth" });

        // Cambiar el texto del enlace a 'Volver'
        categoriaBtn.textContent = "Volver";

        // Limpiar contenido de las secciones diferentes a la actual
        document.querySelectorAll(".productos").forEach((contenedor) => {
          if (contenedor !== contenedorProductos) {
            contenedor.innerHTML = ""; // Limpiar contenido existente
          }
        });

        // Ocultar las demÃ¡s categorÃ­as
        document.querySelectorAll(".categoria").forEach((categoria) => {
          if (!categoria.querySelector(`[data-${opcion}]`)) {
            categoria.querySelector(".texto-categoria").style.display = "none";
            categoria.querySelector(".productos").innerHTML = "";
          }
        });
      } else {
        // Si ya se han mostrado todos los productos, redirigir a la pÃ¡gina de inicio
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      // Manejar el error de manera adecuada
    }
  });
});

export const productosInicio = {
  renderInit,
};
