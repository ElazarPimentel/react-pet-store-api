// app.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import http from 'http'; // Importar http
import { Server } from 'socket.io'; // Importar socket.io
import path from 'path';
import { fileURLToPath } from 'url';
import { productRoutes } from './routes/products.js';
import { cartRoutes } from './routes/carts.js';
import { viewsRouter } from './routes/views.router.js';
import { engine } from 'express-handlebars';
import { connectDB } from './config/db.js';
import { productManager } from './managers/product.manager.js'; // Importar productManager

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.io
const io = new Server(server);

// Conectar a la base de datos
connectDB();

// Middleware para JSON y datos URL-codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como motor de vistas
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main', // Nombre de tu layout principal
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Directorio de layouts
    partialsDir: path.join(__dirname, 'views', 'partials'), // Directorio de partials
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de vistas
app.use('/', viewsRouter);

// Rutas de API
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Middleware para 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Configurar Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar lista de productos al cliente
  socket.on('getProducts', async () => {
    const products = await productManager.getAll();
    socket.emit('updateProducts', products);
  });

  // Manejar creación de producto desde el cliente
  socket.on('addProduct', async (productData) => {
    try {
      await productManager.addProduct(productData);
      const products = await productManager.getAll();
      io.emit('updateProducts', products);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Manejar eliminación de producto desde el cliente
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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
