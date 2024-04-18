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

    console.log(`params: ${req.params.id}`)

    const _id  = req.user._id// Asegúrate de enviar el userId desde el cliente

    console.log(`id usuario: ${_id}`)
   

    // Conectar a la base de datos mediante serverless function
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Obtener el user
   const user = await Users.findById(_id);
console.log(user)
    // Retornar el user
    res.json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getUser;
