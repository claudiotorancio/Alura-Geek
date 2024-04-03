import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";
import { uploadSingle } from "../../../api/router.js";
import Vista from "../../models/Vista.js";

const createProduct = async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // Verificar si el usuario es administrador
        if (!esAdministrador(req.user)) {
            return res.status(403).json({ error: 'Usuario no autorizado para crear productos' });
        }

        // Llamar a uploadSingle para manejar la carga de la imagen
        uploadSingle(req, res, async (error) => {
            if (error) {
                console.error('Error al cargar la foto en S3:', error);
                return res.status(500).json({ error: 'Error al cargar la foto en S3' });
            }

            // Valores del formulario
            const { name, price, section } = req.body;
            const imagePath = req.file.location;
            const user_id = req.user._id;

            // Crear los datos del producto
            const createProductData = {
                name,
                price,
                section,
                imagePath,
                user_id
            };

            // Crear un nuevo producto
            let newProduct;
            if (req.user.role === 'admin') {
                newProduct = new Vista(createProductData);
            } else {
                newProduct = new Product(createProductData);
            }

            // Conectar a la base de datos y guardar el producto
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            await newProduct.save();
            res.json({ message: 'Producto guardado' });
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

export default createProduct;
