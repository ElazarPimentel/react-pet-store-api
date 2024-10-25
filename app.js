// file name: app.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';

// ES nuevo contexto para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para manejar JSON y datos URL codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Export para Vercel 
export default app;
