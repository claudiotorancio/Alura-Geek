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

    const { id } = req.params;
    const { name, price } = req.body;
    let { imagePath, oldImagePath } = req.body; // Definir oldImagePath
    if (!imagePath) {
      imagePath = oldImagePath; // Usar oldImagePath si no hay nueva imagen
    }

    // Validar campos requeridos
    if (!name || !price) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const updateProduct = { name, price, imagePath, oldImagePath };

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    let result;
    if (esAdministrador(req.user)) {
      result = await Vista.findByIdAndUpdate(id, updateProduct, { new: true });
    } else {
      result = await Product.findByIdAndUpdate(id, updateProduct, { new: true });
    }

    // Eliminar imagen anterior en S3
    if (oldImagePath !== imagePath) {
      const nombreDeArchivo = oldImagePath.split("/").pop();
      const params = { Bucket: process.env.BUCKET_AWS, Key: nombreDeArchivo };

      await s3.deleteObject(params).promise(); // Usar promesa para manejar de forma asíncrona

      console.log("Imagen anterior eliminada con éxito en S3");
    }

    if (!result) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json({ message: "Producto actualizado", updatedProduct: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const esAdministrador = (user) => {
  return user.role === "admin";
};

export default updateProduct;
