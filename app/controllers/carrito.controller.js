const { response } = require('express');
const Cart = require('../models/carrito.model');
const Producto = require('../models/ropa.model');

const carritoController = {};

// Obtener carrito del usuario
carritoController.obtainCart = async (req, res) => {

  try {
    const resp = await Cart.findOne({ usuarioId: req.user._id });

     if (!resp) {
      return res.status(404).json({ success: false, message: "Carrito no encontrado" });
    }

    const itemsConSubtotal = resp.items.map(item => ({
      ...item.toObject(),
      subtotal: item.precio * item.cantidad
    }));

    res.json({
      success: true,
      data: {
        ...resp.toObject(),
        items: itemsConSubtotal
      },
      message: "Carrito Obtenido correctamente"
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};

// Agregar producto al carrito
carritoController.addProduct = async (req, res) => {
  const { productoId, cantidad } = req.body;

  try {
    const producto = await Producto.findById(productoId);
    if (!producto) return res.status(404).json({success: false, message: 'Producto no encontrado', error: error.message });

    let carrito = await Cart.findOne({ usuarioId: req.user._id });

    if (!carrito) {
      // Crear nuevo carrito si no existe
      carrito = new Cart({
        usuarioId: req.user._id,
        items: []
      });
    }

    // Buscar si el producto ya existe en el carrito
    const itemExistente = carrito.items.find(item => item.productoId.toString() === productoId);

    if (itemExistente) {
      itemExistente.cantidad += Number(cantidad);
    } else {
      carrito.items.push({
        productoId,
        nombre: producto.nombre,
        precio: producto.precio,
        talla: producto.talla,
        cantidad,
        imagen: producto.imagen
      });
    }

    carrito.total = carrito.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);


    await carrito.save();
    res.status(200).json({ success: true, message: 'Producto agregado al carrito', data: carrito });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al agregar producto', error: error.message });
  }
};

// Actualizar cantidad de un producto
carritoController.updateProduct = async (req, res) => {
  const { productoId, cantidad } = req.body;

  try {
    const carrito = await Cart.findOne({ usuarioId: req.user._id });
    if (!carrito) return res.status(404).json({ success: false, message: 'Carrito no encontrado', error: error.message });

    const item = carrito.items.find(item => item.productoId.equals(productoId));
    if (!item) return res.status(404).json({ success: false, message: 'Producto no encontrado en el carrito', error: error.message });

    item.cantidad = cantidad;
    await carrito.save();

    res.status(200).json({ success:true, message: 'Cantidad actualizada', data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar cantidad', error: error.message });
  }
};

// Eliminar producto del carrito
carritoController.deleteProduct = async (req, res) => {
  const { productoId } = req.query;

  try {
    const carrito = await Cart.findOne({ usuarioId: req.user._id });
    if (!carrito) return res.status(404).json({ success: false, message: 'Carrito no encontrado', error: error.message });

    carrito.items = carrito.items.filter(item => !item.productoId.equals(productoId));
    await carrito.save();

    res.status(200).json({ success: true, message: 'Producto eliminado', data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar producto', error: error.message });
  }
};

// Vaciar carrito
carritoController.emptyCart = async (req, res) => {
  try {
    const carrito = await Cart.findOne({ usuarioId: req.user._id });
    if (!carrito) return res.status(404).json({ success: false, message: 'Carrito no encontrado' , error: error.message});

    carrito.items = [];
    await carrito.save();

    res.status(200).json({ success: true, message: 'Carrito vaciado', data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al vaciar carrito', error: error.message });
  }
};


module.exports = carritoController;