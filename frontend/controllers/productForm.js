import { modalControllers } from "../modal/modal.js";
import productoServices from "../services/product_services.js";

export class ProductForm {
  constructor() {
    this.initForm = document.querySelector("[data-table]");
  }

  //mostrar form
  render() {
    this.clearForm();
    const card = this.createForm();
    this.initForm.appendChild(card);
    this.setupFormSubmitHandler();
  }

  //vaciar contenido
  clearForm() {
    this.initForm.innerHTML = "";
  }

  //crear formulario dinamico
  createForm() {
    modalControllers.baseModal();
    const card = document.createElement("div");
    card.classList.add("modalVisor");
    card.innerHTML = `
        <div class="text-center">
            <div class="card-header">
                <p>Agregar producto</p>
            </div>
            <div class="card-body">
                <form id="form" action="/api/createProduct" enctype="multipart/form-data" method="POST" data-form>
                    <div class="form-group">
                        <input class="form-control p-2"  type="file" name="image" 
                            data-imageUrl  required autofocus>
                    </div>
                    <div class="form-group">
                        <input class="form-control mt-3 p-2" type="text" placeholder="Nombre del producto" name="name" required
                            data-name>
                    </div>
                    <div class="form-group">
                        <input class="form-control mt-3 mb-3 p-2" type="text" placeholder="Precio del producto" name="price"
                            required data-price>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control mt-3 mb-3 p-2" type="text" placeholder="Descripcion" name="description"
                            required data-description></textarea>
                    </div>
                    <p for="miMenuDesplegable">Seccion</p>
                    <div class="form-group">
                        <select class="form-control  mb-3 p-2" id="miMenuDesplegable" name="section">
                            <option value="opcion1">Posters</option>
                            <option value="opcion2">Consolas</option>
                            <option value="opcion3">Diversos</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg">Agregar</button>
                </form>
            </div>
        </div>
      `;

    return card;
  }

  //capturar el evento submit
  setupFormSubmitHandler() {
    const form = this.initForm.querySelector("[data-form]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  }


  //recopilar y enviar los datos
  async handleSubmit(form) {
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      section: formData.get("section"),
      image: formData.get("image"),
    };

    try {
      await productoServices.crearProducto(data);
      modalControllers.modalProductoCreado();
    } catch (error) {
      console.error(error);
    }
  }
}

const productForm = new ProductForm();

export default productForm;
