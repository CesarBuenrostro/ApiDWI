const mongoose = require('mongoose');

const ropaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    edad: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }    
}, {
    timeStamp: true
});

const ropaModel = mongoose.model('ropa', ropaSchema)

module.exports = ropaModel;