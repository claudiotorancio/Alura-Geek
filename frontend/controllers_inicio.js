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
           
            <h3 class="card-title">${name}</h3>
            <a href="#">ver producto </a>
           
          </div>
    
    </div>
      `;
  
    card.innerHTML = contenido;
    card.classList.add('card');
  
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
      const  products  = listaProductos;
  
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
  
        const primerosTresProductos = productos.slice(0, 3);
  
        const contenedorProductos = document.querySelector(`[data-${seccion}]`);
  
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
      console.log(error);
    }
  };

  document.querySelectorAll('.categoria').forEach(categoria => {
    const categoriaBtn = categoria.querySelector('a');
    const opcion = categoriaBtn.getAttribute('id');
    categoriaBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Evitar comportamiento predeterminado del enlace

        try {
   
            const contenedorProductos = document.querySelector(`[data-${opcion}]`);
            contenedorProductos.classList.add('allProducts');

            const tarjetas = contenedorProductos.querySelectorAll('.card');
            tarjetas.forEach(tarjeta => {
                tarjeta.classList.add('allCard');
            });

            const imagen = contenedorProductos.querySelectorAll('.img-card');
            imagen.forEach(tarjeta => {
                tarjeta.classList.add('img-allCard');
            });

            // Obtener el enlace dentro de la categoría actual
            const categoriaBtn = categoria.querySelector('a');

            // Verificar si el texto del enlace es 'Ver todo'
            if (categoriaBtn.textContent === 'Ver todo') {
                // Cambiar el texto del enlace a 'Volver'
                categoriaBtn.textContent = 'Volver';

                // Limpiar contenido de las secciones diferentes a 'opcion1'
                document.querySelectorAll(".productos").forEach(contenedor => {
                    if (contenedor !== contenedorProductos) {
                        contenedor.innerHTML = ""; // Limpiar contenido existente
                    }
                });

                document.querySelectorAll('.categoria').forEach(categoria => {
                        if (!categoria.querySelector(`[data-${opcion}]`)) {
                          // Ocultar el texto de la cabecera
                          categoria.querySelector('.texto-categoria').style.display = 'none';
                          
                          // Limpiar contenido del contenedor de productos
                          categoria.querySelector('.productos').innerHTML = '';
                        }
                      });
            } else {
                // Redirigir a la página de inicio
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            // Manejar el error de manera adecuada
        }
    });
});


  export const  productosInicio = {
renderInit
  } 