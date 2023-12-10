import { loginControllers } from "./login_controllers.js";
import { controllers } from "./productos_controllers.js";
import { productoServices } from "./servicios/product_services.js";

const baseModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const modalClose = document.querySelector('.modal-close');
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

const modalEdicion = (name, price, imagePath, id) => {
    baseModal()
    controllers.renderProductEdit()
    controllers.editProduct(name, price, imagePath, id)
}

const modalEliminar = (id) => {
    baseModal()
    const modal = document.getElementById('modal');
    const eliminarProducto = modal.querySelector('[data-table]');
    eliminarProducto.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    <div>
        <div>
            <br>
            <h4>Desea eliminar el Producto?</h4> 
            <button class="boton-eliminar btn btn-danger" data-index="${id}">Eliminar</button>
        </div>
    </div>
    </div>
    </div>
    `
    const botonEliminar = eliminarProducto.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
        productoServices
            .eliminarProducto(id);
        window.location.href = '/index.html';
    });
    eliminarProducto.classList.add("modalVisor");
    setTimeout(() => {
        window.location.href= '/index.html';
       }, 2000);
}

const modalSuccess = (username) => {
    baseModal()
    const modal = document.getElementById('modal');
    const success = modal.querySelector('[data-table]');
    success.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    <div>
        <div>
            <br>
            <h4>Bienvenido! ${username}</h4> 
            <button class="boton-eliminar btn btn-primary" data-index="">Ir a inicio</button>
        </div>
    </div>
    </div>
    </div>
    `
    const botonEliminar = success.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
        window.location.href = '/index.html';
    });
    setTimeout(() => {
        window.location.href= '/index.html';
       }, 3000);
}

const modalError = () => {
    baseModal()
    const modal = document.getElementById('modal');
    const incorrect = modal.querySelector('[data-table]');
    incorrect.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    <div>
        <div >
            <br>
            <h4>Usuario o contraseña incorrectos</h4> 
            <button class="boton-eliminar btn btn-primary" data-index="">Volver</button>
        </div>
    </div>
    </div>
    </div>
    `
    const botonEliminar = incorrect.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
      
      loginControllers.signin()
    });
    setTimeout(() => {
        loginControllers.signin()
       }, 2000);
}

const modalSuccessSignup = () => {
    baseModal()
    const modal = document.getElementById('modal');
    const successSignup = modal.querySelector('[data-table]');
    successSignup.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    <div>
        <div >
            <br>
            <h4>Datos guardados!</h4> 
            <button class="boton-eliminar btn btn-primary" data-index="">Iniciar Sesion</button>
        </div>
    </div>
    </div>
    </div>
    `
    const botonEliminar = successSignup.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
        
      loginControllers.signin()
    });
    setTimeout(() => {
        loginControllers.signin()
       }, 3000);
}

const modalErrorSignup = () => {
    baseModal()
    const modal = document.getElementById('modal');
    const errorSignup = modal.querySelector('[data-table]');
    errorSignup.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    <div>
        <div >
            <br>
            <h4>Error de conexion intentar de nuevo</h4> 
            <button class="boton-eliminar btn btn-primary" data-index="">SignUp</button>
        </div>
    </div>
    </div>
    </div>
    `
    const botonEliminar = errorSignup.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
        
      loginControllers.signup()
    });

    setTimeout(() => {
        loginControllers.signup()
       }, 2000);

}

const modalLogout = (user) => {
    baseModal();
    const modal = document.getElementById('modal');
    const errorSignup = modal.querySelector('[data-table]');
    errorSignup.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    <div>
        <div >
            <br>
            <h4>Velve Pronto ${user}!!</h4> 
            <button class="boton-eliminar btn btn-primary" data-index="">I a inicio</button>
        </div>
    </div>
    </div>
    </div>
    `
    const botonEliminar = errorSignup.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
    modal.style.display = 'none'
            window.location.href= '/index.html';
     
    });

    setTimeout(() => {
        window.location.href= '/index.html';
       }, 3000);
 

}

export const modalControllers = {
    modalEdicion,
    modalEliminar,
    baseModal,
    modalSuccess,
    modalError,
    modalSuccessSignup,
    modalErrorSignup,
    modalLogout
}
