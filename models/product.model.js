// models/product.model.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, default: '' },
  code: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  category: { type: String, default: '' },
  status: { type: Boolean, default: true },
  thumbnails: { type: [String], default: [] },
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
