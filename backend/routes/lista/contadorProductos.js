import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";
import Vista from '../../models/Vista.js'
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

        let cantidad

        if(req.user.role === 'admin') {
            cantidad = await Vista.find()
        }else {
            cantidad = await Product.countDocuments({ user_id: userId });
        }
        
        res.json({ cantidad});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export default contadorProductos;
