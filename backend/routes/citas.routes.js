const express = require('express');
const router = express.Router();
const citasCtrl = require('../controllers/citas.controller');

// Ruta para obtener citas
router.get('/citas', citasCtrl.getCitas);

// Ruta para crear una nueva cita
router.post('/citas', citasCtrl.createCita);

// Ruta para eliminar una cita
router.delete('/citas/:id', citasCtrl.deleteCita);

module.exports = router;