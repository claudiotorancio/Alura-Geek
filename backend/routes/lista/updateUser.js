import passport from '../../lib/passport.js';

const updateUser = async (req, res) => {
  try {
    // Autenticar la sesión del usuario y ejecutar la estrategia 'local.update'
    passport.authenticate('local.update',  async (error) => {
      if (error) {
        console.error('Error al autenticar la sesión del usuario:', error);
        return res.status(500).json({ error: 'Error al autenticar la sesión del usuario' });
      }

      // Verificar si el usuario está autenticado
      // if (!req.isAuthenticated()) {
      //   return res.status(401).json({ message: 'Usuario no autenticado' });
      // }


      // Si la actualización fue exitosa, enviar una respuesta con el usuario actualizado
      console.log('Usuario actualizado:');
      return res.json({ success:true });
    })(req, res); // Pasar req y res al middleware de Passport
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default updateUser;








// import mongoose from "mongoose";
// import MONGODB_URI from "../../config.js";
// import Users from "../../models/User.js";;
// import helpers from "../../lib/helpers.js";

// const updateUser = async (req, res) => {
//   try {
//     //Verificar si el usuario autenticado es un administrador
//     // if (!req.isAuthenticated()) {
//     //   return res.status(401).json({ message: 'No autorizado' });

//     // }
    
//     const {  newUsername, newPassword } = req.body;
//     const {id }= req.params;
    

//     // Obtener los datos del usuario a actualizar desde el req.body



//     const currentUser = {
//     newUsername,
//         newPassword,
    
//     }

   

// console.log(`req,body: ${req.body}`)
// console.log(`ID del usuario: ${id}`);
//     console.log(`Nuevo nombre de usuario: ${currentUser.newUsername}`);
//     console.log(`Nueva contraseña: ${currentUser.newPassword}`);
//     console.log(`Nuevo User: ${currentUser}`);

// //     const currentUser = {
// //         newUsername,
// //         newPassword
// //     }
// // console.log(currentUser, id)
//     // Buscar el usuario en la base de datos por su ID
//     await mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });

//     const userToUpdate = await Users.findById(id);
// console.log(userToUpdate)
// //     // Verificar si se encontró el usuario
// //     if (!userToUpdate) {
// //       return res.status(404).json({ message: 'Usuario no encontrado' });
// //     }

// //     // Actualizar los datos del usuario
// //     userToUpdate.username = currentUser.newUsername;
// //     userToUpdate.password = await helpers.encryptPassword(currentUser.newPassword);; // No es necesario encriptar si se proporciona desde el admin
// //     await userToUpdate.save();

// //     // Devolver el usuario actualizado
// //     return res.json({ user: userToUpdate });
// res.status(200).json({ message: 'Usuario actualizado correctamente' });
//   } catch (error) {
//     console.error('Error al actualizar usuario:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// export default updateUser;

