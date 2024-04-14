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

    // Objeto para almacenar los productos por sección
    const productosPorSeccion = {
      opcion1: [],
      opcion2: [],
      opcion3: [],
    };

    // Dividir los productos por sección
    products.forEach((elemento) => {
      productosPorSeccion[elemento.section].push(elemento);
    });

    // Renderizar solo los primeros tres productos en cada sección por defecto
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
  let mostrarTodos = false; // Variable para mantener el estado de visualización

  categoriaBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del enlace

    try {
      // Si aún no se han mostrado todos los productos
      if (!mostrarTodos) {
        contenedorProductos.classList.add("allProducts");

        const respuesta = await productoServices.listaProductos();
        const { usuarioHaIniciadoSesion, usuarioAdmin, products } = respuesta;
      

        let listaProductos
        let render; 

        if (!usuarioHaIniciadoSesion) {
          console.log('no inicie session')
          listaProductos = await productoServices.renderInicio();
          render = productoInicio;
        } else if (usuarioHaIniciadoSesion && usuarioAdmin) {
          console.log('inicie sesion y soy admin')
          listaProductos = products;
          console.log(listaProductos)
          render = controllers.nuevoProducto;
        }
        

       
        const allProducts = listaProductos.filter(
          (producto) => producto.section === opcion
        );

        contenedorProductos.innerHTML = ""; // Limpiar contenido existente
        allProducts.forEach((producto) => {
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

         // Desplazar la página hacia arriba
         window.scrollTo({ top: 0, behavior: "smooth" });
        // Cambiar el texto del enlace a 'Volver'
        categoriaBtn.textContent = "Volver";

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

export const productosInicio = {
  renderInit,
};
