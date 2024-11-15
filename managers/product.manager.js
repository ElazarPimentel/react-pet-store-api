// Filename: managers/product.manager.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import { readFile, writeFile } from '../utils/fileHelper.js';

class ProductManager {
  constructor() {
    this.file = 'productos.json';
  }

  async getAll() {
    return await readFile(this.file);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id === parseInt(id));
  }

  async addProduct(productData) {
    const products = await this.getAll();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await writeFile(this.file, products);
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Producto no encontrado');
    products[index] = { ...products[index], ...updateData };
    await writeFile(this.file, products);
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this.getAll();
    const initialLength = products.length;
    products = products.filter(p => p.id !== parseInt(id));
    if (products.length === initialLength) throw new Error('Producto no encontrado');
    await writeFile(this.file, products);
    return true;
  }
}

export const productManager = new ProductManager();
