// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
	productoId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Producto',
		required: true
	},
	nombre: String,
	precio: Number,
	cantidad: {
		type: Number,
		required: true,
		min: [1, 'Cantidad mínima 1']
	},
	talla: String,
	imagen: {
		type: String
	}
});

const cartSchema = new mongoose.Schema({
	usuarioId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	items: [cartItemSchema],
	total: {
		type: Number,
		required: true,
		default: 0
	},
	creadoEn: {
		type: Date,
		default: Date.now
	},
	actualizadoEn: {
		type: Date,
		default: Date.now
	}
});

// Hook para recalcular el total antes de guardar
cartSchema.pre('save', function (next) {
	this.total = this.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
	this.actualizadoEn = new Date();
	next();
});

module.exports = mongoose.model('carrito', cartSchema);
