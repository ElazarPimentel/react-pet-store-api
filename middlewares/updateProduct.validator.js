// Filename: middlewares/updateProduct.validator.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

export const updateProductValidator = (req, res, next) => {
    const { title, description, code, price, stock, category, status, thumbnails } = req.body;
  
    // Título (opcional)
    if (title !== undefined && typeof title !== 'string') {
      return res.status(400).json({ message: "El campo 'title' debe ser una cadena de texto" });
    }
  
    // Descripción (opcional)
    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ message: "El campo 'description' debe ser una cadena de texto" });
    }
  
    // Código (opcional)
    if (code !== undefined && typeof code !== 'string') {
      return res.status(400).json({ message: "El campo 'code' debe ser una cadena de texto" });
    }
  
    // Precio (opcional)
    if (price !== undefined && typeof price !== 'number') {
      return res.status(400).json({ message: "El campo 'price' debe ser un número" });
    }
  
    // Stock (opcional)
    if (stock !== undefined && typeof stock !== 'number') {
      return res.status(400).json({ message: "El campo 'stock' debe ser un número" });
    }
  
    // Categoría (opcional)
    if (category !== undefined && typeof category !== 'string') {
      return res.status(400).json({ message: "El campo 'category' debe ser una cadena de texto" });
    }
  
    // Estado (opcional)
    if (status !== undefined && typeof status !== 'boolean') {
      return res.status(400).json({ message: "El campo 'status' debe ser un booleano" });
    }
  
    // Thumbnails (opcional)
    if (thumbnails !== undefined) {
      if (!Array.isArray(thumbnails) || !thumbnails.every(thumb => typeof thumb === 'string')) {
        return res.status(400).json({ message: "El campo 'thumbnails' debe ser un array de cadenas de texto" });
      }
    }
  
    // Si todo validado, pasar al siguiente middleware o router o lo que corresponda
    next();
  };
  