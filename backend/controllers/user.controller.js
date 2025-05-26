const Users = require('../models/users.model');
const usersCtlr = {};

// Obtener todos los usuarios
usersCtlr.getUsers = async (req, res) => {
    const users = await Users.find();
    res.json(users);
};

// Crear un nuevo usuario
usersCtlr.createUser = async (req, res) => {
    try {
        const newUser = new Users(req.body);
        await newUser.save();
        res.json({ status: 'Usuario creado' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

// Exporta el controlador
module.exports = usersCtlr;