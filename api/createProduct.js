import mongoose from "mongoose";
import MONGODB_URI from "../backend/config.js";
import Product from "../backend/models/Product.js";



const createProduct = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    try{
        const {name, price, section} = req.body

        const imagePath = req.file.location

        const createPeoduct = {
            name,
            price,
            section,
            imagePath
        }
  console.log(createPeoduct)
        const newProduct = new Product(createPeoduct)

      await  mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
await newProduct.save();
res.json({ message: 'Producto guardado'})

    }catch(error) {
        console.log(error)
        res.status(500).json({error: 'Error al crear producto'})
    } finally {
mongoose.connection.close() 
  
}
}
export default createProduct