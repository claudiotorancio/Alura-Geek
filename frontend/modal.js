import { controllers } from "./productos-controllers.js";
import { productoServices } from "./servicios/productos-servicios.js";

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
    <div>
        <div>
            <br>
            <h4>Desea eliminar el Producto?</h4> 
            <button class="boton-eliminar btn btn-danger" data-index="${id}">Eliminar</button>
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

}

export const modal = {
    modalEdicion,
    modalEliminar
}
