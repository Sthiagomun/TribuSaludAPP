const mongoose = require('mongoose');

const citasSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // Relación con el usuario
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    doctor: { type: String, required: true },
    especialidad: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Citas', citasSchema);