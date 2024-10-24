// archivo: app.js

const express = require('express');
const path = require('path');
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// archivos estáticos desde public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de productos y carritos
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Para Vercel
module.exports = app;
