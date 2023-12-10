import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";


const createProduct = async (req, res) => {

    try {
        //verificar si usuario esta autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        //valores de formulario
        const { name, price, section } = req.body

        const imagePath = req.file.location

        //manejo de vista de productos en relacion con el usuario
        const user_id = req.user._id;

        const createPeoduct = {
            name,
            price,
            section,
            imagePath,
            user_id
        }
        console.log(createPeoduct)
        const newProduct = new Product(createPeoduct)

        //conectar a base de datos mediante serverless function
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        await newProduct.save();
        res.json({ message: 'Producto guardado' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al crear producto' })
    }
}
export default createProduct