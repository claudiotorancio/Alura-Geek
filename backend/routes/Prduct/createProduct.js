import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Product from "../../models/Product.js";



const createProduct = async (req, res) => {
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
    } 
}
export default createProduct