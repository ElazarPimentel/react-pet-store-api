// Filename: app.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { productRoutes } from './routes/products.js';
import { cartRoutes } from './routes/carts.js';
import handlebars from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para JSON y datos URL-codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Ruta para renderizar la página principal
app.get('/', (req, res) => {
  res.render('home');
});

// Middleware para 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Exportar para Vercel
export default app;

// Iniciar el servidor localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
