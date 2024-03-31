

const signin = async (req, res) => {
    try {
        //verificar si esta autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        console.log('Usuario autenticado:', req.user);
        console.log('SesiÃ³n:', req.session);
        //Manejo de la respuesta para mostrar en pantalla los valores
        return res.json({ user: req.user });
    } catch (error) {
        console.error('Error en la funciÃ³n signin:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default signin;