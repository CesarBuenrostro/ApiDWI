const userModel = require('../models/user.model');

const userController = {};

// Crear usuario
userController.create = async (req, res) => {
    try {
        const data = req.body;
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

module.exports = userController;