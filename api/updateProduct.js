import mongoose from "mongoose";
import MONGODB_URI from "../backend/config.js";
import Product from "../backend/models/Product.js";
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID
    }
})

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, oldImagePath } = req.body
        const imagePath = req.file.location

        const updateProduct = {
            name,
            price,
            imagePath,
            oldImagePath
        }

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const result = await Product.findByIdAndUpdate(id, updateProduct, { new: true })

        const nombreDeArchivo = oldImagePath.split('/').pop();
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

        if (!result) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json({ message: 'Product updated', updatedProduct: result });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    } finally {
        mongoose.connection.close()
    }
}

export default updateProduct