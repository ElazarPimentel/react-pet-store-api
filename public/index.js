// public/index.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

function addToCart(productId) {
    fetch(`/carts/add/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
            alert('Hubo un problema al agregar el producto al carrito');
        } else {
            alert('Producto agregado al carrito');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
