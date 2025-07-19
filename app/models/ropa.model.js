const mongoose = require('mongoose');

const ropaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
        required: true
    },
    talla: {
        type: String,
        required: true
    }
})

const ropaModel = mongoose.model('ropa', ropaSchema)

module.exports = ropaModel;