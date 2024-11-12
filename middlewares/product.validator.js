// Filename: middlewares/product.validator.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

export const productValidator = (req, res, next) => {
  const { title, description, code, price, stock, category, status, thumbnails } = req.body;

  // Validar campos requeridos
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: "El campo 'title' es obligatorio y debe ser una cadena de texto" });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: "El campo 'description' es obligatorio y debe ser una cadena de texto" });
  }
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ message: "El campo 'code' es obligatorio y debe ser una cadena de texto" });
  }
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: "El campo 'price' es obligatorio y debe ser un número" });
  }
  if (stock === undefined || typeof stock !== 'number') {
    return res.status(400).json({ message: "El campo 'stock' es obligatorio y debe ser un número" });
  }
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: "El campo 'category' es obligatorio y debe ser una cadena de texto" });
  }
  if (status !== undefined && typeof status !== 'boolean') {
    return res.status(400).json({ message: "El campo 'status' debe ser un booleano" });
  }
  // Recordar que es opcional
  if (thumbnails !== undefined && (!Array.isArray(thumbnails) || !thumbnails.every((thumb) => typeof thumb === 'string'))) {
    return res.status(400).json({ message: "El campo 'thumbnails' debe ser un arreglo de cadenas de texto" });
  }

  next();
};
