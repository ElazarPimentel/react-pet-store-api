// Filename: routes/products.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import { productValidator } from '../middlewares/product.validator.js';
import { updateProductValidator } from '../middlewares/updateProduct.validator.js';
import { readFile, writeFile } from '../utils/fileHelper.js';

const router = express.Router();

const productsFileName = 'productos.json'; // Nombre del archivo en /tmp

// GET productos con opcion de limit
router.get('/', async (req, res) => {
  try {
    const products = await readFile(productsFileName);
    const limit = parseInt(req.query.limit);
    if (limit && !isNaN(limit)) {
      return res.json(products.slice(0, limit));
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: `Error leyendo el archivo de productos:${error.message}` });
  }
});

// GET un producto x ID
router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const products = await readFile(productsFileName);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: `Error leyendo el archivo de productos: ${error.message}` });
  }
});

// POST nuevo producto 
router.post('/', productValidator, async (req, res) => {
  const { title, description, code, price, stock, category, status, thumbnails } = req.body;

  try {
    const products = await readFile(productsFileName);
    const newProduct = {
      id: products.length + 1,
      title,
      description,
      code,
      price,
      stock,
      category,
      status: status !== undefined ? status : true, // Predeterminado true
      thumbnails, // Opcional 
    };

    products.push(newProduct);
    await writeFile(productsFileName, products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `Error guardando el producto: ${error.message}` });
  }
});

// PUT  actualizar producto x ID
router.put('/:id', updateProductValidator, async (req, res) => {
  const productId = parseInt(req.params.id);
  const { title, description, code, price, stock, category, status, thumbnails } = req.body;

  try {
    const products = await readFile(productsFileName);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar campos (menos id)
    products[productIndex] = {
      ...products[productIndex],
      title: title !== undefined ? title : products[productIndex].title,
      description: description !== undefined ? description : products[productIndex].description,
      code: code !== undefined ? code : products[productIndex].code,
      price: price !== undefined ? price : products[productIndex].price,
      stock: stock !== undefined ? stock : products[productIndex].stock,
      category: category !== undefined ? category : products[productIndex].category,
      status: status !== undefined ? status : products[productIndex].status,
      thumbnails: thumbnails !== undefined ? thumbnails : products[productIndex].thumbnails,
    };

    await writeFile(productsFileName, products);
    res.json(products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: `Error actualizando el producto: ${error.message}` });
  }
});

// DELETE producto x ID
router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const products = await readFile(productsFileName);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];
    await writeFile(productsFileName, products);
    res.json({ message: 'Producto eliminado', producto: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: `Error eliminando el producto: ${error.message}` });
  }
});

export default router;
