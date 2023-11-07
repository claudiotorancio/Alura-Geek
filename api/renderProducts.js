import mongoose from "mongoose";
import MONGODB_URI from "../backend/config.js";
import Product from "../backend/models/Product.js";

const renderProducts = async (req, res) => {
    try{
      await  mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
const products = await Product.find();
res.json(products)
    }catch(error) {
        console.log(error)
        res.status(500).json({error: 'Error al cargar producto'})
    } finally {
mongoose.connection.close()   
}
};

export default renderProducts