import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";

const contadorProductos = async (req, res) => {
    try {

        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
          }
        // Conectar a la base de datos
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const userId = req.params.id;

        // Buscar productos asociados al usuario específico
        const productosUsuario = await Product.find({ user_id: userId });

        // Contar la cantidad de productos encontrados
        const cantidad = productosUsuario.length;

        // Enviar la respuesta con el total de productos
        res.json({ cantidad });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export default contadorProductos;
