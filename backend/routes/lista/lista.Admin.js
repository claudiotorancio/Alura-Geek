import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Users from "../../models/User.js";

const listaAdmin = async (req, res) => {
  try {
   // Verificar si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    //Verificar si el usuario tiene el rol de administrador
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Usuario no autorizado para acceder a esta función' });
    }

    // Conectar a la base de datos mediante serverless function
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Obtener el listado de usuarios
    const listado = await Users.find();
    const usersCantidad = await Users.countDocuments()

    // Retornar el listado de usuarios
    res.json({ listado, usersCantidad });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default listaAdmin;
