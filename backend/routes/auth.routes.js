const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const User = require('../models/users.model');

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        // Aquí deberías validar la contraseña
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        res.json({ usuarioId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login' });
    }
});

module.exports = router;