import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";


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
    }
}

export default detailsProduct