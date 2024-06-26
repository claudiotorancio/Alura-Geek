import productoServices from "../services/product_services.js";
import { controllers } from "./productos_controllers.js";

class ProductInit {
  constructor() {
  }

  productoInicio(description, name, imagePath) {
    const card = document.createElement("div");
    const contenido = `
      <div class="container mx-auto mt-4">
        <div class="img-card">
          <img class="card-img-top" src="${imagePath}" alt="">
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
  }

  async renderInit() {
    try {
      const listaProductos = await productoServices.renderInicio();
      const products = listaProductos;

      for (const producto of products) {
        this.productoInicio(
          producto.description,
          producto.name,
          producto.imagePath
        );
        // Renderizar el producto y adjuntar al contenedor adecuado
        document
          .querySelector(`[data-${producto.section}]`)
          .appendChild(
            this.productoInicio(
              producto.description,
              producto.name,
              producto.imagePath
            )
          );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

document.querySelectorAll(".categoria").forEach((categoria) => {
  const categoriaBtn = categoria.querySelector("a");
  const opcion = categoriaBtn.getAttribute("id");
  const contenedorProductos = document.querySelector(`[data-${opcion}]`);
  let enInicio = false; // Variable para mantener el estado de visualización

  categoriaBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del enlace

    try {
      // Si aún no se han mostrado todos los productos
      if (!enInicio) {
        contenedorProductos.classList.add("allProducts");

        const tarjetas = contenedorProductos.querySelectorAll(".card");
        tarjetas.forEach((tarjeta) => {
          tarjeta.classList.add("allCard");
        });

        const imagen = contenedorProductos.querySelectorAll(".img-card");
        imagen.forEach((tarjeta) => {
          tarjeta.classList.add("img-allCard");
        });

        // Limpiar contenido de las secciones diferentes a la actual
        document.querySelectorAll(".productos").forEach((contenedor) => {
          if (contenedor !== contenedorProductos) {
            contenedor.innerHTML = ""; // Limpiar contenido existente
          }
        });
          // Ocultar las demás categorías
          document.querySelectorAll(".categoria").forEach((categoria) => {
            if (!categoria.querySelector(`[data-${opcion}]`)) {
              categoria.querySelector(".texto-categoria").style.display = "none";
              categoria.querySelector(".productos").innerHTML = "";
            }
          });

                // Cambiar el texto del enlace a 'Volver'
        categoriaBtn.textContent = "Volver";


        enInicio = true; // Cambiar el estado para volver

        // Desplazar la página hacia arriba
        window.scrollTo({ top: 330, behavior: "smooth" });
      
      } else {
        // Si ya se han mostrado todos los productos, redirigir a la página de inicio
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      // Manejar el error de manera adecuada
    }
  });
});

document.querySelectorAll(".ver-todos").forEach((enlace) => {
  enlace.addEventListener("click", function (event) {
    event.preventDefault();
    const contenedorProductos = this.parentElement.nextElementSibling;
    contenedorProductos.classList.toggle("ver-todos-activado");
  });
});

export const productosInicio = new ProductInit();
