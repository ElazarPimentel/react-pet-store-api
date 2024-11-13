// public/index.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

async function getCartId() { // Aprendido a las malas
    let cartId = localStorage.getItem('cartId');

  if (!cartId) {
    try {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data._id) {
        cartId = data._id;
        localStorage.setItem('cartId', cartId);
      } else {
        console.error('Error al crear el carrito:', data);
      }
    } catch (error) {
      console.error('Error de red al crear el carrito:', error);
    }
  }

  return cartId;
}

async function addToCart(productId) {
  try {
    const cartId = await getCartId();

    if (!cartId) {
      alert('No se pudo obtener el ID del carrito.');
      return;
    }

    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
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
