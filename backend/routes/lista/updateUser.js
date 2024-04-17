import passport from '../../lib/passport.js';

const updateUser = async (req, res) => {
  try {
    passport.authenticate('local.update', { session: true }, async (error, user) => {
        if (error) {
            console.error('Error al autenticar la sesión del usuario:', error);
            return res.status(500).json({ error: 'Error al autenticar la sesión del usuario' });
        }

        // Verificar si el usuario está autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        console.log('Usuario autenticado:', req.user);
        console.log('Sesión:', req.session);

        // Devolver el usuario actualizado en la respuesta
        return res.json({ user });
    })(req, res); // Llamar a la función de autenticación de Passport con los parámetros de solicitud y respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default updateUser;
