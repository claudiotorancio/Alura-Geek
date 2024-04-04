// estilos adicionales propios
import "./styles/assets/css/style.css";
import "./styles/assets/css/productos.css";

import { loginServices } from "./servicios/login_services.js";
import { controllers } from "./productos_controllers.js";
import { loginControllers } from "./login_controllers.js";
import { modalControllers } from "./modal.js";

// busqueda de cambios
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const actualizarUsuario = document.querySelector(".data-user");
  const logoutUsuario = document.querySelector("[data-logOut]");
  const userActive = document.querySelector("[data-log]");
  if (user) {
    controllers.render();
    actualizarUsuario.textContent = `Hola! ${user}`;
    logoutUsuario.textContent = "Logout";
    userActive.style.display = "none";
  } else {
    controllers.renderInit();
    actualizarUsuario.style.display = "none";
    logoutUsuario.style.display = "none";
    userActive.textContent = "Login";
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
