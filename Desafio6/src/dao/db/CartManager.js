import path from 'path';
import __dirname from '../../utils.js';
import { cartsModel } from '../models/carts.model.js';
import { productManager } from './ProductManager.js';
import BasicManager from './BasicManager.js';


class CartManager extends BasicManager {
    constructor() {
        super(cartsModel)
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return "El carrito no existe";
            console.log(cart)

            const product = await productManager.findById(productId);
            if (!product) return "El producto no existe";

            const productExist = cart.products && cart.products.find(p => p.id == productId);

            if (productExist) {
                productExist.quantity += 1;
            } else {
                const product = {
                    id: productId,
                    quantity: 1
                }
                cart.products.push(product);
            }

            await cart.save();
            
            return cart;
        } catch (error) {
            return `Error al añadir el producto al carrito: ${error}`;
        }
    }
}

const cartManager = new CartManager(path.resolve(__dirname, 'carritos.json'));

export default cartManager