

import { modal } from "./modal.js";
import { productoServices } from "./servicios/productos-servicios.js";

const nuevoProducto = (name, price, imagePath, id) => {
    const card = document.createElement("div");
    const contenido = `
        <div class="container mx-auto mt-4">
            <div class="row">
                <div class="col-md-4 ">
                    <div style="width: 15rem;">
                        <img class="card-img-top" src=${imagePath} alt="">
                            <div class="card-body">
                                <h3 class="card-title">${name}</h3>
                                <p class="card-text">${'$'+price}</p>
                                <a href="#form" class="btn btn-primary" id="${id}" data-edit >Editar</a>
                                <button  class="btn btn-danger" type="button" id="${id}" >eliminar</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    card.innerHTML = contenido;
    card.classList.add("card");

    card.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        modal.modalEliminar(id)  
    })

    card.querySelector('[data-edit]').addEventListener('click', (e) => {
        e.preventDefault();
            productoServices
                .detalleProducto(id)
                .then(respuesta => {
                   modal.modalEdicion(name, price, imagePath,id)
                   console.log(respuesta)
                }).catch(() => alert('Ocurrio un error'))
    })

    return card;
}

const productoPosters = document.querySelector('[data-posters]');
const productoConsolas = document.querySelector('[data-consolas]');
const productoDiversos = document.querySelector('[data-diversos]');

const render = async () => {
    try {
        const listaProductos = await productoServices.listaProductos()
        listaProductos.forEach(elemento => {

            if (elemento.section === 'opcion1') {
                productoPosters.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imagePath, elemento._id))
            } else if (elemento.section === 'opcion2') {
                productoConsolas.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imagePath, elemento._id))
            } else if (elemento.section === 'opcion3') {
                productoDiversos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imagePath, elemento._id))
            }
        });
    } catch (erro) {
        console.log(erro)
    }
}

const editProduct = (name, price, imagePath, id) => {
    productoEdicion.innerHTML = '';
    const card = document.createElement('div');
    const contenido = `
    <img class="img-card-top mx-auto" style="width:50vw;" src=${imagePath} alt="">
        <form action="/api/updateProduct/" id="form" enctype="multipart/form-data" method="PUT" data-forma>                
            <p class="parrafo">Producto a editar</p>
                <div class="form-group"> 
                    <input class="form-control p-2"  placeholder="imageUrl" type="file" name="imagePath" value="${imagePath}" required data-image autofocus >
                    <input type="hidden" class="oldImagePath" name="oldImagePath" value="${imagePath}" data-oldPath>
                </div>
                    <div class="form-group">
                    <input class="form-control mt-3 p-2"  placeholder="nombre" type="text" value="${name}" required data-nombre >
                    </div>
                    <div class="form-group"> 
                    <input class="form-control mt-3 mb-3 p-2"  placeholder="precio" type="text"value="${price}" required data-precio>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-primary btn-lg">Editar producto</button>
                    </div>
        </form>
    `

    card.innerHTML = contenido;
    card.classList.add("modalVisor");
    productoEdicion.appendChild(card)

    card.querySelector('[data-forma]').addEventListener('submit', (e) => {
        e.preventDefault();
    
        const name = document.querySelector('[data-nombre]').value;
        const price = document.querySelector('[data-precio]').value;
        const imagePath = document.querySelector('[data-image]').files[0];
        const oldImagePath = document.querySelector('[data-oldPath]').value;
      
        const dataEdit = new FormData()
        dataEdit.append('name', name)
        dataEdit.append('price', price)
        dataEdit.append('imagePath', imagePath)
        dataEdit.append('oldImagePath', oldImagePath)

        productoServices
            .actualizarProducto(dataEdit, id)
            .then((err) => {
                window.location.href = '/index.html'
                console.log(err)
            })
    })
    return card;
}

const productoEdicion = document.querySelector('[data-table]');

const renderProductEdit = async (id) => {
    try {
        const listaProductos = await productoServices.listaProductos()

        listaProductos.forEach(elemento => {
            if (elemento._id === id) {
                productoEdicion
                .appendChild(editProduct( elemento.name, elemento.price, elemento.imagePath, elemento._id))
             
            }
        })
    } catch (erro) {
        console.log(erro)
    }
}

export const controllers = {
    nuevoProducto,
    render,
    editProduct,
    renderProductEdit
}

