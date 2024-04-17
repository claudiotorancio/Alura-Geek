import passport from '../../lib/passport.js';

const updateUser = async (req, res) => {
  try {
    // Autenticar la sesión del usuario con la estrategia 'local.update'
    passport.authenticate('local.update', { session: true }, async (err, user, info) => {
      // Manejar errores de autenticación
      if (err) {
        console.error('Error al autenticar la sesión del usuario:', err);
        return res.status(500).json({ error: 'Error al autenticar la sesión del usuario' });
      }

      // Si la autenticación fue exitosa, el usuario se encuentra en req.user
      if (user) {
        console.log('Usuario actualizado:', user);
        // Enviar una respuesta con el usuario actualizado
        return res.json({ user });
      }

      // Si la autenticación falló (por ejemplo, credenciales incorrectas), se devuelve info
      if (info && info.message) {
        console.error('Error de autenticación:', info.message);
        return res.status(401).json({ message: info.message });
      }

      // Si no hay usuario ni información disponible, mostrar un error genérico
      console.error('Error de autenticación desconocido');
      return res.status(500).json({ error: 'Error de autenticación desconocido' });
    })(req, res); // Llamar a la función devuelta por passport.authenticate
  } catch (error) {
    console.error('Error en updateUser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateUser;
