

const signin = async (req, res) => {
  try {
      if (!req.isAuthenticated()) {
          return res.status(401).json({ message: 'Usuario no autenticado' });
      }
      console.log('Usuario autenticado:', req.user);
      console.log('Sesión:', req.session);

      return res.json({ user: req.user });
  } catch (error) {
      console.error('Error en la función signin:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export default signin;