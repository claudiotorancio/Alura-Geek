
import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
  }
});

const deleteProduct = async (req, res) => {
  try {

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const productId = req.params.id

    const eliminarProduct = await Product.findByIdAndDelete(productId);

    const nombreDeArchivo = eliminarProduct.imagePath.split('/').pop();

    const params = {
      Bucket: process.env.BUCKET_AWS,
      Key: nombreDeArchivo,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error('Error al eliminar la imagen en S3:', err);
      } else {
        console.log('Imagen eliminada con éxito en S3:', data);
      }
    });
    res.json({ message: 'Product deleted' });

  } catch (error) {
    console.error(error)
  }
}

export default deleteProduct