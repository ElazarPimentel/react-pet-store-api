// Alumno: Alessio (Elazar) Aguirre Pimentel
// app.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { productRoutes } from './routes/products.js';
import { cartRoutes } from './routes/carts.js';
import { viewsRouter } from './routes/views.router.js';
import { engine } from 'express-handlebars';
import { productManager } from './managers/product.manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', viewsRouter);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('getProducts', async () => {
    const products = await productManager.getAll();
    socket.emit('updateProducts', products);
  });

  socket.on('addProduct', async (productData) => {
    try {
      await productManager.addProduct(productData);
      const products = await productManager.getAll();
      io.emit('updateProducts', products);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const products = await productManager.getAll();
      io.emit('updateProducts', products);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
