// Filename: managers/cart.manager.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import { CartModel } from "../models/cart.model.js";

class CartManager {
  async getById(cartId) {
    try {
      return await CartModel.findById(cartId).populate("products.productId");
    } catch (error) {
      throw new Error("Error retrieving cart: " + error.message);
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      const productInCart = cart.products.find(p => p.productId.equals(productId));

      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      return await cart.save();
    } catch (error) {
      throw new Error("Error adding product to cart: " + error.message);
    }
  }

  async updateProductQuantity(cartId, productId, quantityChange) {
    try {
      const cart = await CartModel.findById(cartId);
      const productInCart = cart.products.find(p => p.productId.equals(productId));

      if (productInCart) {
        productInCart.quantity += quantityChange;
        if (productInCart.quantity <= 0) {
          cart.products = cart.products.filter(p => !p.productId.equals(productId));
        }
      } else {
        throw new Error("Product not found in cart");
      }

      return await cart.save();
    } catch (error) {
      throw new Error("Error updating product quantity in cart: " + error.message);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findByIdAndUpdate(cartId, {
        $pull: { products: { productId } }
      }, { new: true });

      return cart;
    } catch (error) {
      throw new Error("Error removing product from cart: " + error.message);
    }
  }
}

export const cartManager = new CartManager();
