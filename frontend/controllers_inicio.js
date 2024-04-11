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

   //todos los productos posters

document.getElementById('posters').addEventListener('click', async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del enlace

  
    
    try {
      // Obtener los productos correspondientes a la sección 'posters'
      const listaProductos = await productoServices.renderInicio();
     
      const products = listaProductos.filter(producto => producto.section === 'opcion1');
  
      // Limpiar el contenedor de productos antes de renderizar los nuevos
      const contenedorProductos = document.querySelector('[data-opcion1]');
      contenedorProductos.innerHTML = ''; // Limpiar contenido existente
      
      // Renderizar los productos correspondientes a la sección 'posters'
      products.forEach((producto) => {
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
  
      // Limpiar contenido de las secciones diferentes a 'opcion1'
      document.querySelectorAll('.productos').forEach(contenedor => {
        if (contenedor !== contenedorProductos) {
          contenedor.innerHTML = ''; // Limpiar contenido existente
        }
      });
  
      document.querySelectorAll('.categoria').forEach(categoria => {
        if (!categoria.querySelector('[data-opcion1]')) {
          // Ocultar el texto de la cabecera
          categoria.querySelector('.texto-categoria').style.display = 'none';
          
          // Limpiar contenido del contenedor de productos
          categoria.querySelector('.productos').innerHTML = '';
        }
      });
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      // Manejar el error de manera adecuada
    }
  });


  //todos los productos consolas

  document.getElementById('consolas').addEventListener('click', async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del enlace
    
    try {
      // Obtener los productos correspondientes a la sección 'posters'
      const listaProductos = await productoServices.renderInicio();
     
      const products = listaProductos.filter(producto => producto.section === 'opcion2');
  
      // Limpiar el contenedor de productos antes de renderizar los nuevos
      const contenedorProductos = document.querySelector('[data-opcion2]');
      contenedorProductos.innerHTML = ''; // Limpiar contenido existente
      
      // Renderizar los productos correspondientes a la sección 'posters'
      products.forEach((producto) => {
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
  
      // Limpiar contenido de las secciones diferentes a 'opcion1'
      document.querySelectorAll('.productos').forEach(contenedor => {
        if (contenedor !== contenedorProductos) {
          contenedor.innerHTML = ''; // Limpiar contenido existente
        }
      });
  
      document.querySelectorAll('.categoria').forEach(categoria => {
        if (!categoria.querySelector('[data-opcion2]')) {
          // Ocultar el texto de la cabecera
          categoria.querySelector('.texto-categoria').style.display = 'none';
          
          // Limpiar contenido del contenedor de productos
          categoria.querySelector('.productos').innerHTML = '';
        }
      });
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      // Manejar el error de manera adecuada
    }
  });

  //todos los productos diversos

  document.querySelectorAll('.categoria').forEach(categoria => {
    const categoriaBtn = categoria.querySelector('a');
    categoriaBtn.addEventListener('click', (e) => {
      if (categoriaBtn.textContent === 'Ver todo') {
        categoriaBtn.textContent = 'Volver';
        // Cambiar la clase del contenedor de productos
        const contenedorProductos = categoria.querySelector('.productos');
        contenedorProductos.classList.toggle('allProducts');
  
        // Cambiar la clase de las tarjetas
        const tarjetas = categoria.querySelectorAll('.productos div.allCards:nth-child(1)');
        tarjetas.forEach(tarjeta => {
          console.log("Aplicando clase allCard a la tarjeta:", tarjeta);
          tarjetas.classList.toggle('allCard');
        });
      } else {
        window.location.href = 'index.html';
      }
    });
  

  });
  
  
  
  

  export const  productosInicio = {
renderInit
  } 