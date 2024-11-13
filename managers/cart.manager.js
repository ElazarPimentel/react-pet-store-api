// Filename: managers/cart.manager.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import CartModel from '../models/cart.model.js';

class CartManager {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      return await newCart.save();
    } catch (error) {
      throw new Error('Error al crear el carrito: ' + error.message);
    }
  }

  async getById(cartId) {
    try {
      return await CartModel.findById(cartId).populate('products.productId');
    } catch (error) {
      throw new Error('Error al obtener el carrito: ' + error.message);
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      const productInCart = cart.products.find((p) => p.productId.equals(productId));

      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      return await cart.save();
    } catch (error) {
      throw new Error('Error al agregar producto al carrito: ' + error.message);
    }
  }



  

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cartId,
        { $pull: { products: { productId } } },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error('Error al eliminar producto del carrito: ' + error.message);
    }
  }
}

export const cartManager = new CartManager();
