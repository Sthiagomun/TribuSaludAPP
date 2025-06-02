const mongoose = require('mongoose');

const citasSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    doctor: { type: String, required: true },
    especialidad: { type: String, required: true },
    observaciones: { type: String }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Citas', citasSchema);