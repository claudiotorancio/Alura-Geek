

const getAdmin = async (req, res) => {
  try {
  //  Verificar si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // //Verificar si el usuario tiene el rol de administrador
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Usuario no autorizado para acceder a esta función' });
    }

    const role = req.user.role

    console.log(`usuario: ${role}`)


    // Retornar el user
    res.json({ role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAdmin;
