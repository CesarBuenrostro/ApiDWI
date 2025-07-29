const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const validator = require('validator')

const userController = {};

// Crear usuario
userController.create = async (req, res) => {
    try {
        const data = req.body;

        if (!data.correo) {
            return res.status(400).json({
                success: false,
                message: "El correo es obligatorio"
            });
        }

        data.correo = data.correo.trim().toLowerCase();

        // Validar formato de correo y que no tenga espacios internos
        if (!validator.isEmail(data.correo) || /\s/.test(data.correo)) {
            return res.status(400).json({
                success: false,
                message: "El correo no tiene un formato válido o contiene espacios"
            });
        }

        const existingUser = await userModel.findOne({ correo: data.correo});
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "El correo ya está registrado"
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        
        const resp = await userModel.create(data);

        return res.status(201).json({
            success: true,
            data: resp,
            message: "Se ha creado un usuario correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear usuario",
            error: error.message
        })
    }
};

// Obtener usuarios
userController.getAll = async (req, res) => {
    try {
        const data = await userModel.find();
        return res.status(200).json({
            success: true,
            data: data,
            message: "se ejecuto la consulta de usuarios correctamente"
        })

    } catch (error) {
       return res.status(500).json({
        success: false,
        message: "Error al consultar usuarios",
        error: error.message
       }) 
    }  
};

// Actualizar usuario
userController.update = async (req, res) => {
    try {
        const key = req.params.key;
    const value = req.params.value;
    const data = req.body;

    const filter = {[key]: value}

    const resp = await userModel.findOneAndUpdate(filter, data, {new: true})

    if (!resp) {
        return res.status(404).json({
            success: false,
            message: `no se encontro ningún ususuario con ${key} = ${value}`
        })
    }

    return res.status(200).json({
        success: true,
        data: resp,
        message: "Usuario actualizado correctamente"
    })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar",
            error: error.message
        })    
    }
};

// Eliminar usuario
userController.delete = async (req, res) => {
    try {
        const key = req.params.key;
        const value = req.params.value;

        const filter = {[key]: value};

        const data = await userModel.findOne(filter);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        await data.deleteOne();

        return res.status(200).json({
            success: true,
            data: data,
            message: "Usuario eliminado correctamente"
        })

    } catch (error) {  
        return res.status(500).json({
            success: false,
            message: "Error al eliminar",
            error: error.message
        })      
    }
};

// Login de usuario
userController.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Validar que los campos no estén vacíos
        if (!correo || !password) {
            return res.status(400).json({
                success: false,
                message: "correo y contraseña son requeridos"
            });
        }

        const normalizedEmail = correo.trim().toLowerCase();

        const user = await userModel.findOne({ correo: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        const payload = {
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || 'id'
        })

        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            token,
            user: payload,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en el inicio de sesión",
            error: error.message
        });
    }
};

module.exports = userController;