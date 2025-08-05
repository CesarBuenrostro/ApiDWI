const History = require('../models/history.model');
const Carrito = require('../models/carrito.model');

const historyController = {};

// Crear pedido en historial
historyController.create = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ usuarioId: req.user._id });
        
        usuarioId = (req.user._id)
                
        if (!carrito || carrito.items.length === 0) {
            return res.status(400).json({ message: 'Carrito vacío o no encontrado' });
        }
        
        const nuevoPedido = new history({
            usuarioId,
            productos: carrito.items.map(item => ({
                productoId: item.productoId,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.cantidad,
                talla: item.talla
            })),
            total: carrito.total
        });

        await nuevoPedido.save();

        await carrito.deleteOne({ usuarioId: req.user._id });

        res.status(201).json({ success: true, message: 'Pedido creado con éxito', data: nuevoPedido });

    } catch (error) {
        res.status(500).json({success: false, message: "Error al crear pedido", error: error.message})
    }
}

// obtener Historial de compras
historyController.obtainHistory = async (req, res) => {
    try {
        const history = await History.find()
        .populate('usuarioId', 'nombre correo')
        .sort({ creadoEn: -1 });

        res.status(200).json({
            success: true,
            data: history,
            message: "Pedidos obtenidos correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener carrito0",
            error: error.message
        })
    }
}

// Actualizar compra
historyController.update = async(req, res) => {
    try {
        const data = req.body;
        
        const filter = {usuarioId: req.user._id}

        const pedido = await History.findOneAndUpdate( filter, data, { new: true} )
        if (!pedido) {
            return res.status(404).json({
                susccess: true,
                message: "El pedido no existe",
                error: error.error.message
            })
        }

        return res.status(200).json({
            success: true,
            data: pedido,
            message: "Pedido actualizado"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el historial",
            error: error.message
        })
    }
}

// Eliminar Del historial de compra
historyController.delete = async(req, res) => {

    try {
        const filter = {usuarioId: req.user._id};

        const data = await History.findOneAndDelete(filter);

        if (!data) {
            return res.status(404).json({
                success: true,
                message: "Pedido no encontrado"
            })
        }
        
        res.status(200).json({
            success: true,
            data: data,
            message: "Pedido eliminado correctamente"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar pedido",
            error: error.message
        })
    }
}


module.exports = historyController;