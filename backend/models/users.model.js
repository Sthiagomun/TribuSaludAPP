const mongoose = require('mongoose');

// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Campo nombre
    email: { type: String, required: true, unique: true },
    tipo_de_documento: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    eps: { type: String, required: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    historialMedico: { type: String }, // Nuevo campo para el historial médico
}, {
    timestamps: true, // Agrega campos de creación y actualización automáticamente
});

// Exporta el modelo
module.exports = mongoose.model('User', userSchema);