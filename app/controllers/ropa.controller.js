const ropaModel = require('../models/ropa.model');

const ropaController = {};

// Crear ropa
ropaController.create = async (req, res) => {
    try {
        const data = req.body;
        const resp = await ropaModel.create(data);
        
        return res.status(201).json({
            success: true,
            data: resp,
            message: "Se ha creado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear",
            error: error.message
        });
    }
};

//Obtener ropa
ropaController.getAll = async (req, res) => {
    try {
        const data = await ropaModel.find();
        return res.status(200).json({
            success: true,
            data: data,
            message: "Consulta correcta"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al consultar",
            error: error.message
        });
    }
};

// Actualizar ropa
ropaController.update = async (req,res) => {
    try {
        const key = req.params.key;
        const value = req.params.value; 
        const data = req.body;

        const filter = {[key]: value}

        const resp = await ropaModel.findOneAndUpdate(filter, data, {new : true});

        if (!resp) {
            return res.status(404).json({
                success: false,
                message: `No se encontro ningún registro con ${key} = ${value}`
            });
        }

        return res.status(200).json({
            success: true,
            data: resp,
            message: "registro actualizado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar",
            error: error.message
        })
    }
};

//Eliminar ropa
ropaController.delete = async (req,res) => {
    try {
        const key = req.params.key
        const value = req.params.value;
        
        const filter = {[key]: value};

        const data = await ropaModel.findOne(filter);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "ropa no encontrada"
            })
        } 

        await data.deleteOne();

        return res.status(200).json({
            success: true,
            data: data,
            message: "Eliminado correctamente"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error al eliminar",
            error: error.message
        })
    }
};


module.exports = ropaController;
