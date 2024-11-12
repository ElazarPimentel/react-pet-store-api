// Filename: managers/product.manager.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import { ProductModel } from "../models/product.model.js";

class ProductManager {
  async getAll() {
    try {
      return await ProductModel.find({});
    } catch (error) {
      throw new Error("Error al obtener los productos: " + error.message);
    }
  }

  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error("Error al obtener el producto por ID: " + error.message);
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = new ProductModel(productData);
      return await newProduct.save();
    } catch (error) {
      throw new Error("Error al agregar el producto: " + error.message);
    }
  }

  async updateProduct(id, updateData) {
    try {
      return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error("Error al actualizar el producto: " + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error al eliminar el producto: " + error.message);
    }
  }
}

export const productManager = new ProductManager();
