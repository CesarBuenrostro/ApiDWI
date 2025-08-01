const mongoose = require('mongoose');

const ropaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    imagen: { 
        type: String
    },
    genero: { 
        type: String,
        enum: ['hombre', 'mujer', 'unisex'],
        required: true
    },
    temporada: { 
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const ropaModel = mongoose.model('ropa', ropaSchema);
module.exports = ropaModel;
