// filename: routes/carts.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import { readFile, writeFile } from '../utils/fileHelper.js';

const router = express.Router();

const cartsFileName = 'carrito.json'; // Nombre  archivo en /tmp
const productsFileName = 'productos.json'; // Nombre archivo en /tmp

// GET carrito x ID
router.get('/:id', async (req, res) => {
  const cartId = parseInt(req.params.id);
  try {
    const carts = await readFile(cartsFileName);
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: `Error leyendo el archivo de carritos: ${error.message}` });
  }
});

// POST crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const carts = await readFile(cartsFileName);
    const newCart = { id: carts.length + 1, products: [] };
    carts.push(newCart);

    await writeFile(cartsFileName, carts);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: `Error creando el carrito: ${error.message}` });
  }
});

// POST agregar producto a carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  try {
    const carts = await readFile(cartsFileName);
    const products = await readFile(productsFileName);

    const cart = carts.find(c => c.id === cartId);
    const product = products.find(p => p.id === productId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar si producto está en carrito
    const productInCart = cart.products.find(p => p.id === productId);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }

    await writeFile(cartsFileName, carts);
    res.status(201).json(cart);

  } catch (error) {
    res.status(500).json({ error: `Error añadiendo el producto al carriot: ${error.message}` });
  }
});

export default router;
