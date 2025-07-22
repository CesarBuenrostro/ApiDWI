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

ropaController.update = async (req,res) => {
    try {
        const id = req.params.id; // aqui puede cambiar dependiendo de que utilicemos como id
        const data = req.body;
        const resp = await ropaModel.findByIdAndUpdate(id, data, {new : true});
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

ropaController.delete = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await ropaModel.findById(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Correspondencia no encontrada",
                error: error.message
            })
        } else {
            await data.deleteOne();
            return res.status(200).json({
                success: true,
                data: data,
                message: "Eliminado correctamente"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error al eliminar",
            error: error.message
        })
    }
};



module.exports = ropaController;
