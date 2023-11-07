
import './styles/assets/css/style.css'
import './styles/assets/css/productos.css'

import { productoServices } from "./servicios/productos-servicios.js";
import { controllers } from "./productos-controllers.js";

document.addEventListener('DOMContentLoaded', () => {
    controllers.render();
  });

const form = document.querySelector('[data-form]');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const section= document.getElementById('miMenuDesplegable').value;
    const image = document.querySelector('[data-imageUrl]').files[0];

   const productData = new FormData()
    productData.append('name', name)
    productData.append('price', price)
    productData.append('section', section)
    productData.append('image', image)

    productoServices
    .crearProducto(productData)
    .then((respuesta) => {
        window.location.href = "/index.html"
        alert("El producto fue creado con exito")
        console.log(respuesta)
    }).catch((err) => {
        console.log(err)
    })
   
});


