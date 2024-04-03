
//manejo de dominio en devMode o prodMode

export const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://alura-geek-main-xi.vercel.app'
    : 'http://localhost:3000';
   
//CRUD de productos

const renderInicio = async () =>
    await fetch(`${baseURL}/api/renderInicio`).then((respuesta) => respuesta.json());

    const crearProductoInicio = async (product) => {
        await fetch(`${baseURL}/api/productoInicio`, {
            method: 'POST',
            body: product
        })
            .then((respuesta) => {
                if (respuesta.ok) {
                    return respuesta.body
                }
                throw new Error('no fue posible crear un producto')
            })
    }

const listaProductos = async () =>
    await fetch(`${baseURL}/api/renderProducts`).then((respuesta) => respuesta.json());

const crearProducto = async (product) => {
    await fetch(`${baseURL}/api/createProduct`, {
        method: 'POST',
        body: product
    })
        .then((respuesta) => {
            if (respuesta.ok) {
                return respuesta.body
            }
            throw new Error('no fue posible crear un producto')
        })
}

const eliminarProducto = async (id) => {
    await fetch(`${baseURL}/api/deleteProduct/${id}`, {
        method: "DELETE",
    })

}

const detalleProducto = async (id) => {
    await fetch(`${baseURL}/api/detailsProduct/${id}`)
        .then((respuesta) => respuesta.json()

        )

}

const actualizarProducto = async (product, id) => {
    await fetch(`${baseURL}/api/updateProduct/${id}`, {
        method: "PUT",

        body: product

    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(err))

}




export const productoServices = {
    crearProductoInicio,
    renderInicio,
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,

}
