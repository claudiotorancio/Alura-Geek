//manejo de dominio en devMode o prodMode

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://alura-geek-main-xi.vercel.app"
    : "http://localhost:3000";

//CRUD de productos

const renderInicio = async () =>
  await fetch(`${baseURL}/api/renderInicio`).then((respuesta) =>
    respuesta.json()
  );

  const listaProductos = async () => {
    try {
      const respuesta = await fetch(`${baseURL}/api/renderProducts`);
      const data = await respuesta.json();
      // Acceder a los productos y al total desde el objeto de respuesta
      const products = data.products;
      const total = data.total;

      // Retornar los productos si es necesario
      return {products, total};
    } catch (error) {
      console.error(error);
    }
  };
  

const crearProducto = async (product) => {
  await fetch(`${baseURL}/api/createProduct`, {
    method: "POST",
    body: product,
  }).then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.body;
    }
    throw new Error("no fue posible crear un producto");
  });
};

const eliminarProducto = async (id) => {
  await fetch(`${baseURL}/api/deleteProduct/${id}`, {
    method: "DELETE",
  });
};

const detalleProducto = async (id) => {
  await fetch(`${baseURL}/api/detailsProduct/${id}`).then((respuesta) =>
    respuesta.json()
  );
};

const actualizarProducto = async (product, id) => {
  await fetch(`${baseURL}/api/updateProduct/${id}`, {
    method: "PUT",

    body: product,
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const productoServices = {
  renderInicio,
  listaProductos,
  crearProducto,
  eliminarProducto,
  detalleProducto,
  actualizarProducto,
};
