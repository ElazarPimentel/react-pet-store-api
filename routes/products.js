// archivo: routes/products.js

const express = require('express');
const { productValidator } = require('../middlewares/product.validator');
const path = require('path');
const router = express.Router();
const { readFile, writeFile } = require('../utils/fileHelper');

const productsFilePath = path.join(__dirname, '../data/productos.json');

// GET todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await readFile(productsFilePath);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: `Error leyendo el archivo de productos: ${error.message}` });
  }
});

// GET un producto por ID
router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  
  try {
    const products = await readFile(productsFilePath);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: `Error leyendo el archivo de productos: ${error.message}` });
  }
});

// POST un nuevo producto con middleware de validación
router.post('/', productValidator, async (req, res) => {
  const { title, price, thumbnail } = req.body;

  try {
    const products = await readFile(productsFilePath);
    const newProduct = {
      id: products.length + 1,
      title,
      price,
      thumbnail: thumbnail || '/images/thumbnails/default.png',
    };

    products.push(newProduct);
    await writeFile(productsFilePath, products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `Error guardando el producto: ${error.message}` });
  }
});

module.exports = router;
