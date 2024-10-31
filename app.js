// filename: app.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para JSON y URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Middleware para rutas no encontradas 
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Export para Vercel 
export default app;

// Iniciar el servidor localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
