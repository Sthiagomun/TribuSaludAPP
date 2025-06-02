const Users = require('../models/users.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userCtrl = {};

// Obtener todos los usuarios
userCtrl.getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// Crear un nuevo usuario
userCtrl.createUser = async (req, res) => {
    try {
        const { nombre, email, tipo_de_documento, documento, eps, password, telefono } = req.body;

        const newUser = new Users({
            nombre,
            email,
            tipo_de_documento,
            documento,
            eps,
            password,
            telefono,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

// Obtener un usuario por ID
userCtrl.getUnicoUsuario = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

// Actualizar un usuario
userCtrl.updateUser = async (req, res) => {
    try {
        const { nombre, email, tipo_de_documento, documento, eps, telefono, historialMedico, password, currentPassword } = req.body;

        // Busca el usuario
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se quiere cambiar la contraseña
        if (password) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Debes ingresar la contraseña actual para cambiar la contraseña.' });
            }
            // Compara la contraseña actual (texto plano)
            if (user.password !== currentPassword) {
                return res.status(400).json({ message: 'La contraseña actual es incorrecta.' });
            }
            // Actualiza la nueva contraseña
            user.password = password;
        }

        // Actualiza los demás campos
        user.nombre = nombre;
        user.email = email;
        user.tipo_de_documento = tipo_de_documento;
        user.documento = documento;
        user.eps = eps;
        user.telefono = telefono;
        user.historialMedico = historialMedico;

        await user.save();

        res.json({ message: 'Datos actualizados correctamente', user });
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar los datos', error: error.message });
    }
};

// Eliminar un usuario
userCtrl.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ status: 'Usuario eliminado', user: deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

// Iniciar sesión
userCtrl.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.json({ message: 'Login exitoso', user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = userCtrl;