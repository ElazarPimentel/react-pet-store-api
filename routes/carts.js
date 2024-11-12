// Filename: routes/carts.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import cartManager from '../managers/cart.manager.js';

const router = express.Router();

// Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito: ' + error.message });
  }
});

// Obtener carrito por ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito: ' + error.message });
  }
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity || 1);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito: ' + error.message });
  }
});

// Eliminar producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito: ' + error.message });
  }
});




export { router as cartRoutes };
