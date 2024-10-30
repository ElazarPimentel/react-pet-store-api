// Filename: middlewares/product.validator.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

export const productValidator = (req, res, next) => {
  const { title, description, code, price, stock, category, status, thumbnails } = req.body;

  // Título
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: "El campo 'title' es requerido y debe ser una cadena de texto" });
  }

  // Descripción
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: "El campo 'description' es requerido y debe ser una cadena de texotr" });
  }

  // Código
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ message: "El campo 'code' es requerido y debe ser una cadena de texto" });
  }

  // Precio
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: "El campo 'price' es requerido y debe ser un numero" });
  }

  // Stock
  if (stock === undefined || typeof stock !== 'number') {
    return res.status(400).json({ message: "El campo 'stock' es requerido y debe ser un número" });
  }

  // Categoría
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: "El campo 'category' es requerido y debe ser una cadena de texto" });
  }

  // Estado (opcional, por defecto true)
  if (status !== undefined && typeof status !== 'boolean') {
    return res.status(400).json({ message: "El campo 'status' debe ser un booleano" });
  }

  // Thumbnails (opcional, array de strings)
  if (thumbnails !== undefined) {
    if (!Array.isArray(thumbnails) || !thumbnails.every(thumb => typeof thumb === 'string')) {
      return res.status(400).json({ message: "El campo 'thumbnails' debe ser un array de cadenas de texto" });
    }
  }

  // Si todo validado, pasar al siguiente middleware o router o lo que corresponda
  next();
};
