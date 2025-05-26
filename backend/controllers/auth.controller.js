const User = require('../models/users.model');

const authCtrl = {};

authCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Comparación simple de contraseña (sin bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({ usuarioId: user._id });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = authCtrl;