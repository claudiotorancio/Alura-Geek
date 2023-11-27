
import './styles/assets/css/style.css'
import './styles/assets/css/productos.css'


import { productoServices } from "./servicios/product_services.js";
import { loginServices } from './servicios/login_services.js';
import { controllers } from "./productos_controllers.js";
import { loginControllers } from './login_controllers.js';


document.addEventListener('DOMContentLoaded', () => {
   

    const user = JSON.parse(localStorage.getItem('user')) || null;
    const actualizarUsuario = document.querySelector('.carrito-cantidad');
    const logoutUsuario = document.querySelector('[data-logOut]')
    const userActive = document.querySelector('[data-log]')
    if(user){
        actualizarUsuario.textContent = `Hola! ${user}`
        logoutUsuario.textContent= 'logout'
        userActive.textContent=''
        userActive.style.display='none'
        controllers.render();
    }else{
        actualizarUsuario.textContent = ''
        logoutUsuario.style.display = 'none';
        userActive.textContent='Login'
    }

});

const form = document.querySelector('[data-form]');

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

    const user = JSON.parse(localStorage.getItem('user')) || null;
if(user) {
    productoServices
    .crearProducto(productData)
    .then((respuesta) => {
        window.location.href = "/index.html"
        alert("El producto fue creado con exito")
        console.log(respuesta)
    }).catch((err) => {
        console.log(err)
    })
}else{
    alert ('debe registrarse para comenzar!')
    loginControllers.signin()
}
  
       

});


const login = document.querySelector('[data-log]');

login.addEventListener('click', (e) => {
    e.preventDefault();
    loginControllers.signin();


});



const logOut = document.querySelector('[data-logOut]');

logOut.addEventListener('click', (e) => {
    e.preventDefault();
   loginServices.logout()


});