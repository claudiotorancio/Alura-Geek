import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";
import Vista from "../../models/Vista.js";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

const updateProduct = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Parámetros del formulario
    const { id } = req.params;
    const { name, price } = req.body;
    let imagePath = req.file ? req.file.location : ''; // Si no hay nueva imagen, mantener la imagen anterior
    const {oldImagePath} = req.body.oldImagePath; // Usar la ruta de la imagen anterior
    
    const updateProduct = {
      name,
      price,
      imagePath,
      oldImagePath,
    };

    // Conectar a la base de datos mediante serverless function
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Crear un nuevo producto o vista según el rol del usuario
    let result;
    if (esAdministrador(req.user)) {
      result = await Vista.findByIdAndUpdate(id, updateProduct, { new: true });
    } else {
      result = await Product.findByIdAndUpdate(id, updateProduct, { new: true });
    }

    // Borrar la imagen anterior en S3 si se proporciona una nueva
    if (req.file && oldImagePath) {
      const nombreDeArchivo = oldImagePath.split("/").pop();
      const params = {
        Bucket: process.env.BUCKET_AWS,
        Key: nombreDeArchivo,
      };

      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.error("Error al eliminar la imagen anterior en S3:", err);
        } else {
          console.log("Imagen anterior eliminada con éxito en S3:", data);
        }
      });
    }

    if (!result) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json({ message: "Product updated", updatedProduct: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const esAdministrador = (user) => {
  return user.role === "admin";
};

export default updateProduct;
