// Filename: public/realtime.js
// Alumno: Alessio (Elazar) Pimentel

const socket = io(); // Y acá

socket.emit('getProducts');

socket.on('updateProducts', (products) => {
  const productsList = document.getElementById('product-list');
  productsList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', product.id);
    li.innerHTML = `
      ${product.title} - $${product.price}
      <button onclick="deleteProduct(${product.id})">Eliminar</button>
    `;
    productsList.appendChild(li);
  });
});

document.getElementById('add-product-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const price = parseFloat(e.target.price.value);
  const thumbnail = e.target.thumbnail.value;

  socket.emit('addProduct', { title, price, thumbnail });

  e.target.reset();
});

function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}

socket.on('error', (data) => {
  alert(data.message);
});
