import mongoose from "mongoose";
import MONGODB_URI from "../../config.js";
import Users from "../../models/User.js";;
import helpers from "../../lib/helpers.js";

const updateUser = async (req, res) => {
  try {
    //Verificar si el usuario autenticado es un administrador
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const userId = req.params.id;

    // Obtener los datos del usuario a actualizar desde el req.body
    const {  newUsername, newPassword } = req.body;
console.log(req.body)
    // Buscar el usuario en la base de datos por su ID
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    const userToUpdate = await Users.findById(userId);
console.log(userToUpdate)
    // Verificar si se encontró el usuario
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    userToUpdate.username = newUsername;
    userToUpdate.password = await helpers.encryptPassword(newPassword);; // No es necesario encriptar si se proporciona desde el admin
    await userToUpdate.save();

    // Devolver el usuario actualizado
    return res.json({ user: userToUpdate });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default updateUser;

