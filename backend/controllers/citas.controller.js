const mongoose = require('mongoose');
const User = require('../models/users.model');

const Citas = mongoose.models.Citas || mongoose.model('Citas', new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ref a 'User'
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    doctor: { type: String, required: true },
    especialidad: { type: String, required: true },
}));

const citasCtrl = {};

// Método para obtener citas
citasCtrl.getCitas = async (req, res) => {
    try {
        const { usuarioId } = req.query;
        let filter = {};

        if (usuarioId) {
            if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
                return res.status(400).json({ message: 'El usuarioId no es válido' });
            }
            filter.usuarioId = usuarioId;
        }

        const citas = await Citas.find(filter).populate('usuarioId', 'nombre email tipo_de_documento documento eps telefono');
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ message: 'Error al obtener citas', error: error.message });
    }
};

// Método para crear una nueva cita
citasCtrl.createCita = async (req, res) => {
    try {
        const nuevaCita = new Citas(req.body);
        const citaGuardada = await nuevaCita.save();
        res.status(201).json(citaGuardada);
    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({ message: 'Error al crear la cita', error: error.message });
    }
};

// Método para eliminar una cita
citasCtrl.deleteCita = async (req, res) => {
    try {
        const { id } = req.params;
        const citaEliminada = await Citas.findByIdAndDelete(id);
        
        if (!citaEliminada) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        
        res.json({ message: 'Cita cancelada exitosamente' });
    } catch (error) {
        console.error('Error al cancelar la cita:', error);
        res.status(500).json({ message: 'Error al cancelar la cita', error: error.message });
    }
};

module.exports = citasCtrl;