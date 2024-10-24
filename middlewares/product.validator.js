// archivo: middlewares/product.validator.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

export const productValidator = (req, res, next) => {
    const { title, price, thumbnail } = req.body;
  
    // Título
    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "El campo 'title' es requerido y debe ser una cadena de texto" });
    }
  
    // Precio
    if (price === undefined || typeof price !== "number") {
      return res.status(400).json({ message: "El campo 'price' es requerido y debe ser un número" });
    }
  
    // Thumbnail (opcional, pero si se proporciona, tiene que ser una cadena)
    if (thumbnail && typeof thumbnail !== "string") {
      return res.status(400).json({ message: "El campo 'thumbnail' debe ser una cadena de texto" });
    }
  
    // Si todo validado, pasar al siguiente middleware o router
    next();
  };
  