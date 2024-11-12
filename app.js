// filename: app.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './db/connection.js'; 
import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Conexión a MongoDB
connectToDatabase(); 

// Middleware para URLs y JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lugar para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Middleware para 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Exportar para Vercel
export default app;

// Inicio local del servidor
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
