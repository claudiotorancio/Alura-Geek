import passport from '../../lib/passport.js';

const updateUser = async (req, res) => {
  try {
    // Autenticar la sesión del usuario y ejecutar la estrategia 'local.update'
    passport.authenticate('local.update', { session: true }, async (error, user) => {
      if (error) {
        console.error('Error al autenticar la sesión del usuario:', error);
        return res.status(500).json({ error: 'Error al autenticar la sesión del usuario' });
      }

    //   Verificar si el usuario está autenticado
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      // Manejar la respuesta de la estrategia 'local.update'
      if (!user) {
        return res.status(400).json({ message: 'Error al actualizar usuario' });
      }

      // Si la actualización fue exitosa, enviar una respuesta con el usuario actualizado
      console.log('Usuario actualizado:', user);
      return res.json({ user });
    })(req, res); // Pasar req y res al middleware de Passport
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default updateUser;
