// Filename: routes/views.router.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import { productManager } from '../managers/product.manager.js';
import { cartManager } from '../managers/cart.manager.js';

export const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.render('home', { products });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});

viewsRouter.get('/products', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.render('products', { products });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});

viewsRouter.get('/cart/:id', async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.id);
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Error al cargar el carrito');
  }
});
