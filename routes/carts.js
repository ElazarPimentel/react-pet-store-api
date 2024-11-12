// Filename: routes/carts.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import { cartManager } from '../managers/cart.manager.js';

const router = express.Router();

// GET un carrito por ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: `Error fetching cart: ${error.message}` });
  }
});

// POST para crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: `Error creating cart: ${error.message}` });
  }
});

// POST para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity || 1);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: `Error adding product to cart: ${error.message}` });
  }
});

// DELETE un producto de un carrito
router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Cart or product not found' });
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: `Error removing product from cart: ${error.message}` });
  }
});

export { router as cartRoutes };
