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
    let imagePath = '';

    if (req.file) {
      imagePath = req.file.location;
    } else {
      const product = await Product.findById(id);
      imagePath = product.imagePath;
    }

    const updateProduct = {
      name,
      price,
      imagePath,
    };

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

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file && result.imagePath !== oldImagePath) {
      deleteOldImageFromS3(result.imagePath);
    }

    return res.json({ message: "Product updated", updatedProduct: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const esAdministrador = (user) => {
  return user.role === "admin";
};

const deleteOldImageFromS3 = (imagePath) => {
  const nombreDeArchivo = imagePath.split("/").pop();
  const params = {
    Bucket: process.env.BUCKET_AWS,
    Key: nombreDeArchivo,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error('Error al eliminar la imagen en S3:', err);
    } else {
      console.log('Imagen anterior eliminada con éxito en S3:', data);
    }
  });
};

export default updateProduct;
