// public/index.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

async function addToCart(productId) {
    try {
      const response = await fetch(`/carts/add/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error:', data.error);
        alert('Hubo un problema al agregar el producto al carrito');
      } else {
        alert('Producto agregado al carrito');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red al agregar el producto al carrito');
    }
  }
  