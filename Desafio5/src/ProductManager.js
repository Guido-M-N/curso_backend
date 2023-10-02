import fs from 'fs';
import path from 'path';
import __dirname from './utils.js';
import Product from './Product.js';

class ProductManager {
    constructor(path){
        this.path = path
    }

    async addProduct(product) {
        if (!product.title) return "Falta el titulo"
        if (!product.description) return "Falta el descripcion"
        if (!product.price) return "Falta el precio"
        if (!product.thumbnail) return "Falta el thumbnail"
        if (!product.code) return "Falta el codigo de identificacion"
        if (!product.stock) return "Falta el dato de stock"

        const newProduct = new Product( product.title, product.description, product.stock, product.price, product.code, product.thumbnail, product.category )

        try {
            let products = await this.getProducts()

            if (products.find((productItem) => productItem.code === product.code)) {
                return "No es posible agregar el producto, codigo ya existente";
            }
            
            const id = products.length ? products[products.length-1].id + 1 : 1

            newProduct.setId(id)

            products = [...products, newProduct]

            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return "Producto añadido con exito"
        }

        catch (error) {
            return error
        }
        
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                return []
            }
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(readFile)
            return products
        }

        catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try{
            const products = await this.getProducts()

            const findProduct = products.find(product => product.id == id)

            if (!findProduct) return -1
            return findProduct
        }

        catch (error) {
            return error
        }        
    }

    async updateProduct(id, newProduct) {
        try{
            const products = await this.getProducts()

            const findProduct = products.find(product => product.id == id)

            if (!findProduct) return "Not found"

            if (newProduct.title) findProduct.title = newProduct.title
            if (newProduct.description) findProduct.description = newProduct.description
            if (newProduct.price) findProduct.price = newProduct.price
            if (newProduct.thumbnail) findProduct.thumbnail = newProduct.thumbnail
            if (newProduct.stock) findProduct.stock = newProduct.stock
            // no se contempla cambiar el "code" para no arruinar la integridad de los datos

            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return "Producto actualizado con exito"
        }

        catch (error) {
            return error
        }       
    }

    async deleteProduct(id) {
        try{
            const products = await this.getProducts()

            const findProduct = products.find(product => product.id == id)
            
            const index = products.indexOf(findProduct)

            if (products[index]) {
                products.splice(index, 1)
            }
            else {
                return "Error al eliminar producto"
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return "Producto eliminado con exito"
        }

        catch (error) {
            return error
        }       
    }
}

export const productManager = new ProductManager(path.resolve(__dirname, 'productos.json'));

export default Product

