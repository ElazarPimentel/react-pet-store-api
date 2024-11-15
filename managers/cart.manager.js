// Filename: managers/cart.manager.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import { readFile, writeFile } from '../utils/fileHelper.js';

class CartManager {
  constructor() {
    this.file = 'carrito.json';
  }

  async createCart() {
    const carts = await this.getAll();
    const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await writeFile(this.file, carts);
    return newCart;
  }

  async getAll() {
    return await readFile(this.file);
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find(c => c.id === parseInt(id));
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id === parseInt(cartId));
    if (!cart) throw new Error('Carrito no encontrado');
    const product = cart.products.find(p => p.productId === parseInt(productId));
    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ productId: parseInt(productId), quantity });
    }
    await writeFile(this.file, carts);
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id === parseInt(cartId));
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = cart.products.filter(p => p.productId !== parseInt(productId));
    await writeFile(this.file, carts);
    return cart;
  }
}

export const cartManager = new CartManager();
