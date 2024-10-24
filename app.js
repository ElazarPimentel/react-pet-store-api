// archivo: app.js

const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

// Middleware para manejar el análisis del cuerpo JSON
app.use(express.json());

// Montar las rutas de productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
