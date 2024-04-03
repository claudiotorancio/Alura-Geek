import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Vista from "../../models/Vista.js";
import Product from "../../models/Product.js";
import { uploadSingle } from "../../../api/router.js";

const productoInicio = async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // Verificar si el usuario es administrador
        if (!esAdministrador(req.user)) {
              // Valores del formulario
              const { name,  section } = req.body;
              const imagePath = req.file.location;
              const user_id = req.user._id;
  
              const createProductData = {
                  name,
                  section,
                  imagePath,
                  user_id
              };
            //return res.status(403).json({ error: 'Usuario no autorizado para crear productos' });
        }else {
            
        }

        // Llamar a uploadSingle para manejar la carga de la imagen
        uploadSingle(req, res, async (error) => {
            if (error) {
                console.error('Error al cargar la foto en S3:', error);
                return res.status(500).json({ error: 'Error al cargar la foto en S3' });
            }

            // Si la carga fue exitosa, proceder con la creación del producto

            // Valores del formulario
            const { name,  section } = req.body;
            const imagePath = req.file.location;
            const user_id = req.user._id;

            const createProductData = {
                name,
                section,
                imagePath,
                user_id
            };

            // Crear un nuevo producto
            const newProduct = new Vista(createProductData);

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

// Función para verificar si el usuario es administrador
const esAdministrador = (user) => {
    // Aquí debes implementar la lógica para determinar si el usuario es administrador
    // Por ejemplo, puedes verificar si el usuario tiene un rol de administrador en sus credenciales.
    // Retorna true si el usuario es administrador, de lo contrario, false.
    return user.role === 'admin'; // Ejemplo: aquí se asume que el usuario tiene un campo 'role' que indica su rol.
};

export default productoInicio;
