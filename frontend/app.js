// estilos adicionales propios
import './styles/assets/css/style.css'
import './styles/assets/css/productos.css'


import { productoServices } from "./servicios/product_services.js";
import { loginServices } from './servicios/login_services.js';
import { controllers } from "./productos_controllers.js";
import { loginControllers } from './login_controllers.js';
import { modalControllers } from './modal.js';


// busqueda de cambios
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('user')) || null;
    const actualizarUsuario = document.querySelector('.data-user');
    const logoutUsuario = document.querySelector('[data-logOut]')
    const userActive = document.querySelector('[data-log]')
    if (user) {
        controllers.render();
        actualizarUsuario.textContent = `Hola! ${user}`
        logoutUsuario.textContent = 'Logout'
        userActive.style.display = 'none'

    } else {
        actualizarUsuario.style.display = 'none'
        logoutUsuario.style.display = 'none';
        userActive.textContent = 'Login'
    }

});

const crearproducto = document.querySelector('[data-init]');
    crearproducto.addEventListener('click', () => {
        modalControllers.baseModal()
      controllers.formProduct()
    });


//extraer info de formulario
/*const form = document.querySelector('[data-form]');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const section = document.getElementById('miMenuDesplegable').value;
    const image = document.querySelector('[data-imageUrl]').files[0];

    const productData = new FormData()
    productData.append('name', name)
    productData.append('price', price)
    productData.append('section', section)
    productData.append('image', image)

    const user = JSON.parse(sessionStorage.getItem('user')) || null;
    if (user) {
        productoServices
            .crearProducto(productData)
            .then(() => {
                modalControllers.modalProductoCreado()
             
            }).catch((err) => {
                console.log(err)
            })
    } else {
  modalControllers.modalErrorRegistro()
      
    }

});*/

//inicio de sesion desde boton Login
const login = document.querySelector('[data-log]');

login.addEventListener('click', (e) => {
    e.preventDefault();
    loginControllers.signin();
});

// logout desde boton Logout
const logOut = document.querySelector('[data-logOut]');

logOut.addEventListener('click', (e) => {
    e.preventDefault();
    loginServices.logout()
});