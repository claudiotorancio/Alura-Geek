import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";

const renderProducts = async (req, res) => {

    try {
        console.log(req.isAuthenticated())
        //verificar que el usuario este autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        //relacionar id de usuario con producto para visualizar solo sus productos
        const user_id = req.user._id;

        //conectar a base de datos mediante serverless function
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const products = await Product.find({ user_id: user_id });
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al cargar producto' })
    }
};

export default renderProducts