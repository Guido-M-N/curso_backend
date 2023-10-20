import fs from 'fs';
import path from 'path';
import __dirname from './utils.js';
import { productManager } from "./ProductManager.js";
class CartManager {
    
    constructor(path){
        this.path = path
    }

    async getCarts(){
        try {
            if (fs.existsSync(this.path)) {
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(readFile)
            return carts
            }
            else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async getCartById(id){
        try {
            const cartStatus = -1

            const carts = await this.getCarts()
            const findCart = carts.find(cart => cart.id == id)
            console.log(findCart)
            if (!findCart) return cartStatus
            return findCart
        } catch (error) {
            return error
        }
    }

    async addCart(){
        try {

            const carts = await this.getCarts()

            const id = carts.length ? carts[carts.length-1].id + 1 : 1

            const newCart = {

                id: id,
                products: []

            }

            await fs.promises.writeFile(this.path, JSON.stringify([...carts, newCart]))

            return "Carrito creado con exito"

        } catch (error) {
            return error
        }
    }

    async addCartProduct(pid, cid){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart.id == cid)
            const product = await productManager.getProductById(pid)
            if(product == -1) return -1
            const newProduct = {
                id: pid,
                quantity: 1
            }
            const cartProducts = cart.products
            const findProduct = cartProducts.find(product => product.id == pid)
            if (findProduct){
                findProduct.quantity++
            } 
            else{
                cartProducts.push(newProduct)
            }
            fs.promises.writeFile(this.path, JSON.stringify(carts))
            return newProduct
        } catch (error) {
            return error
        }
    }

}

const cartManager = new CartManager(path.resolve(__dirname, 'carritos.json'));

export default cartManager