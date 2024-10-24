// archivo: routes/carts.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

const express = require('express');
const path = require('path');
const router = express.Router();
const { readFile, writeFile } = require('../utils/fileHelper');

const cartsFilePath = path.join(__dirname, '../data/carrito.json');
const productsFilePath = path.join(__dirname, '../data/productos.json');

// GET carrito por ID
router.get('/:id', async (req, res) => {
    const cartId = parseInt(req.params.id);
    try {
        const carts = await readFile(cartsFilePath);
        const cart = carts.find(c => c.id === cartId);
        
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: `Error leyendo el archivo de carritos: ${error.message}` });
    }
});

// POST para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const carts = await readFile(cartsFilePath);
        const newCart = { id: carts.length + 1, products: [] };
        carts.push(newCart);

        await writeFile(cartsFilePath, carts);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: `Error creando el carrito: ${error.message}` });
    }
});

// POST para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    try {
        const carts = await readFile(cartsFilePath);
        const products = await readFile(productsFilePath);

        const cart = carts.find(c => c.id === cartId);
        const product = products.find(p => p.id === productId);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el producto ya existe en el carrito
        const productInCart = cart.products.find(p => p.id === productId);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ id: productId, quantity: 1 });
        }

        await writeFile(cartsFilePath, carts);
        res.status(201).json(cart);

    } catch (error) {
        res.status(500).json({ error: `Error añadiendo el producto al carrito: ${error.message}` });
    }
});

module.exports = router;
