import "./styles/assets/css/style.css";
import "./styles/assets/css/productos.css";

import { loginServices } from "./servicios/login_services.js";
import { controllers } from "./productos_controllers.js";
import { loginControllers } from "./login_controllers.js";
import { modalControllers } from "./modal.js";
import { ListaControllers } from "./lista.controllers.js";
import { productosInicio } from "./controllers_inicio.js";

document.addEventListener("DOMContentLoaded", () => {
 
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const divUsuario = document.querySelector(".rounded-circle");
  const actualizarUsuario = document.querySelector(".data-user");
  const logoutUsuario = document.querySelector("[data-logOut]");
  const userActive = document.querySelector("[data-log]");
  const contactUser = document.querySelector("[data-contact]");
  
  // Mostrar u ocultar elementos según si hay un usuario autenticado
  if (user) {
    controllers.render();
    const tabla = document.querySelector("[data-lista]");
    const titulo = document.querySelector("[data-titulo]");
    const listaControllersInstance = new ListaControllers(tabla, titulo);
    listaControllersInstance.renderLista(); // Llamada al método renderLista()
    actualizarUsuario.textContent = `${user}`;
    logoutUsuario.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
    userActive.style.display = "none";
    contactUser.style.display = "none";
  } else {
    // Si no hay usuario autenticado, renderiza productos iniciales
    productosInicio.renderInit();
    divUsuario.style.display = "none";
    actualizarUsuario.style.display = "none";
    logoutUsuario.style.display = "none";
    userActive.innerHTML = '<i class="fa-solid fa-user"></i>';
  }
});



//crear producto desde save products
const crearproducto = document.querySelector("[data-init]");

crearproducto.addEventListener("click", () => {
  modalControllers.baseModal();
  controllers.formProduct();
});

//inicio de sesion desde boton Login
const login = document.querySelector("[data-log]");

login.addEventListener("click", (e) => {
  e.preventDefault();
  loginControllers.signin();
});

// logout desde boton Logout
const logOut = document.querySelector("[data-logOut]");

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  loginServices.logout();
});
