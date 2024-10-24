// archivo: routes/products.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

const express = require('express');
const path = require('path');
const router = express.Router();
const { readFile, writeFile } = require('../utils/fileHelper');

const productsFilePath = path.join(__dirname, '../data/productos.json');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await readFile(productsFilePath);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: `Error leyendo el archivo de productos: ${error.message}` });
    }
});

// GET a product by ID
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

// POST a new product
router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body;

    if (!title || price === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (typeof price !== 'number') {
        return res.status(400).json({ error: 'El campo "price" debe ser un número' });
    }

    try {
        const products = await readFile(productsFilePath);
        const newProduct = {
            id: products.length + 1, // Simple ID generation
            title,
            price,
            thumbnail: thumbnail || '/images/thumbnails/default.png'
        };

        products.push(newProduct);

        await writeFile(productsFilePath, products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: `Error guardando el producto: ${error.message}` });
    }
});

module.exports = router;
