import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";


const renderProducts = async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // Relacionar id de usuario con producto para visualizar solo sus productos
        const user_id = req.user._id;

        // Conectar a la base de datos mediante serverless function
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Buscar productos del usuario actual
        const products = await Product.find({ user_id: user_id });
        res.json(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        res.status(500).json({ error: 'Error al cargar productos' });
    }
};

export default renderProducts;
