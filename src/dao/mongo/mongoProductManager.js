import Productos from '../model/products.model.js'; 

class MongoProductManager {
  async addProduct(product) {
    try {
      if (!this.isProductValid(product)) {
        throw new Error("El producto no es válido");
      }

      const newProduct = new Productos(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error("Error al añadir producto: " + error.message);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const updatedProduct = await Productos.findByIdAndUpdate(id, updatedFields, { new: true });
      if (!updatedProduct) {
        throw new Error("Producto no encontrado");
      }
      return updatedProduct;
    } catch (error) {
      throw new Error("Error al actualizar producto: " + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Productos.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error("Producto no encontrado");
      }
      return deletedProduct;
    } catch (error) {
      throw new Error("Error al eliminar producto: " + error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await Productos.findById(id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      throw new Error("Error al obtener producto: " + error.message);
    }
  }

  async getProducts() {
    try {
      const products = await Productos.find({});
      return products;
    } catch (error) {
      throw new Error("Error al obtener productos: " + error.message);
    }
  }

  isProductValid(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock !== undefined
    );
  }
}

export default new MongoProductManager();
