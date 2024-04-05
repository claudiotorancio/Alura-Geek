import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Users from "../../models/User.js";

const deleteUser = async (req, res) => {
  try {
    // Verificar si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Conectar a la base de datos
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Obtener el ID del usuario a eliminar
    const userId = req.params.id;

    // Verificar si el usuario autenticado tiene el rol de administrador
    if (req.user.role === 'admin') {
      // Buscar y eliminar el usuario por su ID
      const deletedUser = await Users.findByIdAndDelete(userId);
      
      // Verificar si el usuario se encontró y se eliminó correctamente
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Usuario eliminado con éxito
      return res.json({ message: 'User deleted', deletedUser });
    } else {
      // Si el usuario no es administrador, devolver un error de autorización
      return res.status(403).json({ error: 'Usuario no autorizado para eliminar usuarios' });
    }
  } catch (error) {
    // Manejar errores durante la eliminación del usuario
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default deleteUser;
