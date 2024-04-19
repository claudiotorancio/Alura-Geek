import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Users from "../../models/User.js";

const getUser = async (req, res) => {
  try {
  //  Verificar si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // //Verificar si el usuario tiene el rol de administrador
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Usuario no autorizado para acceder a esta función' });
    }

    let userId = req.params.id; // Intenta obtener userId de la URL
    
    // Si no hay userId en la URL, utiliza req.user._id
    if (!userId) {
      userId = req.user._id;
    }

    console.log(`id usuario: ${userId}`)

    // Conectar a la base de datos mediante serverless function
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Obtener el user
   const user = await Users.findById(userId);
console.log(user)


    // Retornar el user
    res.json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getUser;