// Filename: models/product.model.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, default: true },
  thumbnails: { type: [String], default: [] },
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
