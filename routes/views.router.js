// routes/views.router.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import { productManager } from '../managers/product.manager.js';
import { cartManager } from '../managers/cart.manager.js';

export const viewsRouter = express.Router();

// inicio
viewsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.render('home', { products, title: 'Inicio' });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});

// Productos
viewsRouter.get('/products', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.render('products', { products, title: 'Productos' });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});

// Carrito
viewsRouter.get('/cart/:id', async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.id);
    res.render('cart', { cart, title: 'Carrito' });
  } catch (error) {
    res.status(500).send('Error al cargar el carrito');
  }
});

// Productos en tiempo real
viewsRouter.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.render('realTimeProducts', { products, title: 'Productos en Tiempo Real' });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});
