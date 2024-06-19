
import CartsModel from '../model/carts.model.js';

class MongoCartsManager  {
    constructor() {
      
    }

    async addProductToCart(userId, productId) {
        try {
            let cart = await CartsModel.findOne({ userId });

            if (!cart) {
                cart = new CartsModel({ userId, products: [] });
            }

            cart.productos.push(productId);

            await cart.save();

            console.log('Product added to cart successfully');
            return cart; 
        } catch (error) {
            console.error('Error adding product to cart:', error.message);
            throw error;
        }
    }

    async createCart() {
        try {
            
            const newCart = await CartsModel.create({
                productos: [],
                total: 0
            });
            return newCart;
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async getCart(cartId) {
        try {
            const cart = await CartsModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw new Error(`Error getting cart: ${error.message}`);
        }
    }
};

export default MongoCartsManager;

