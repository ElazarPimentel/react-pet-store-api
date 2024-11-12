// Filename: app.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { productRoutes } from './routes/products.js';
import { cartRoutes } from './routes/carts.js';
import { viewsRouter } from './routes/views.router.js';
import handlebars from 'express-handlebars';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para JSON y datos URL-codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como motor de vistas
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para vistas
app.use('/', viewsRouter);

// Rutas para API
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Middleware para 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
