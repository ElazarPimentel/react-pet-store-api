// Filename: routes/products.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import { productManager } from '../managers/product.manager.js';
import { productValidator } from '../middlewares/product.validator.js';
import { updateProductValidator } from '../middlewares/updateProduct.validator.js';

const router = express.Router();

// GET todos los productos con límite (límite opcional
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getAll();
    const limit = parseInt(req.query.limit);
    res.json(limit ? products.slice(0, limit) : products);
  } catch (error) {
    res.status(500).json({ error: `Error fetching products: ${error.message}` });
  }
});

// GET un solo producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productManager.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: `Error fetching product: ${error.message}` });
  }
});

// POST un nuevo producto
router.post('/', productValidator, async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `Error adding product: ${error.message}` });
  }
});

// PUT para actualizar un producto existente por ID
router.put('/:id', updateProductValidator, async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: `Error updating product: ${error.message}` });
  }
});

// DELETE un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProduct(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: `Error deleting product: ${error.message}` });
  }
});

export { router as productRoutes };
