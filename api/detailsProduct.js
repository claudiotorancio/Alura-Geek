import mongoose from "mongoose";
import MONGODB_URI from "../backend/config.js";
import Product from "../backend/models/Product.js";


const detailsProduct = async (req, res) => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        const productId = req.params.id

        const product = await Product.findById(productId)

        res.json({ message: 'Product finded', product });
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.connection.close()
    }
}

export default detailsProduct