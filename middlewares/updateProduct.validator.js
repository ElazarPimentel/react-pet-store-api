// Filename: middlewares/updateProduct.validator.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

export const updateProductValidator = (req, res, next) => {
  const { title, description, code, price, stock, category, status, thumbnails } = req.body;

  // Validar campos opcionales
  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({ message: "El campo 'title' debe ser una cadena de texto" });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ message: "El campo 'description' debe ser una cadena de texto" });
  }
  if (code !== undefined && typeof code !== 'string') {
    return res.status(400).json({ message: "El campo 'code' debe ser una cadena de texto" });
  }
  if (price !== undefined && typeof price !== 'number') {
    return res.status(400).json({ message: "El campo 'price' debe ser un número" });
  }
  if (stock !== undefined && typeof stock !== 'number') {
    return res.status(400).json({ message: "El campo 'stock' debe ser un número" });
  }
  if (category !== undefined && typeof category !== 'string') {
    return res.status(400).json({ message: "El campo 'category' debe ser una cadena de texto" });
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
