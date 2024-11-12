// Filename: routes/products.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import productManager from '../managers/product.manager.js';
import { productValidator } from '../middlewares/product.validator.js';
import { updateProductValidator } from '../middlewares/updateProduct.validator.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getAll();
    const limit = parseInt(req.query.limit);
    res.json(limit ? products.slice(0, limit) : products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos: ' + error.message });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productManager.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto: ' + error.message });
  }
});

// Agregar nuevo producto
router.post('/', productValidator, async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto: ' + error.message });
  }
});

// Actualizar producto existente
router.put('/:id', updateProductValidator, async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto: ' + error.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProduct(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto: ' + error.message });
  }
});

export { router as productRoutes };
