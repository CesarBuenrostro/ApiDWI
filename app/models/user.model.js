const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;