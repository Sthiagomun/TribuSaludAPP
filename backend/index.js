// Requerimientos de librerías
const express = require('express'); // Declaración única de express
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const citasRoutes = require('./routes/citas.routes');

// Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Rutas
app.use('/api/users', require('./routes/users.routes'));
app.use('/api', citasRoutes); // Prefijo '/api' para las rutas
app.use('/api', require('./routes/auth.routes'));

// Conexión a MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/users'; // Cambia esto según tu configuración
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor activo en el puerto: ${app.get('port')}`);
});