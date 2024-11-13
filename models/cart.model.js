// Filename: models/cart.model.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;