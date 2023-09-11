const fs = require('fs')
const { get } = require('http')

class ProductModel {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = null
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

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

        try {
            let products = await this.getProducts()

            if (products.find((productItem) => productItem.code === product.code)) {
                return "No es posible agregar el producto, codigo ya existente";
            }
            
            const id = products.length ? products[products.length-1].id + 1 : 1

            product.id = id

            products = [...products, product]

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

            if (!findProduct) return "Not found"
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


module.exports = { ProductModel, ProductManager }



/*
const productManager = new ProductManager("productos.json");

const product1 = new ProductModel(
    title = "producto prueba 1",
    description = 'Este es un producto prueba 1',
    price = 200,
    thumbnail = 'Sin imagen',
    code = 'abc121',
    stock = 25
);

const product2 = new ProductModel(
    title = "producto prueba 2",
    description = 'Este es un producto prueba 2',
    price = 164,
    thumbnail = 'Sin imagen',
    code = 'abc122',
    stock = 543
);

const product3 = new ProductModel(
    title = "producto prueba 3",
    description = 'Este es un producto prueba 3',
    price = 240,
    thumbnail = 'Sin imagen',
    code = 'abc123',
    stock = 120
);

const product4 = new ProductModel(
    title = "producto prueba 4",
    description = 'Este es un producto prueba 4',
    price = 240,
    thumbnail = 'Sin imagen',
    code = 'abc124',
    stock = 120
);

const product5 = new ProductModel(
    title = "producto prueba 5",
    description = 'Este es un producto prueba 5',
    price = 240,
    thumbnail = 'Sin imagen',
    code = 'abc125',
    stock = 120
);

const product6 = new ProductModel(
    title = "producto prueba 6",
    description = 'Este es un producto prueba 6',
    price = 240,
    thumbnail = 'Sin imagen',
    code = 'abc126',
    stock = 120
);

const updatedProduct = new ProductModel(
    title = "producto prueba ACTUALIZADO",
    description = 'Este es un producto prueba 3',
    price = 240,
    thumbnail = 'Sin imagen',
    code = 'abc121',
    stock = 120
);

// Funcion de test
const test = async () => {

    console.log(await productManager.getProducts());

    console.log(await productManager.addProduct(product1));
    console.log(await productManager.addProduct(product2));
    console.log(await productManager.addProduct(product3));
    console.log(await productManager.addProduct(product4));
    console.log(await productManager.addProduct(product5));
    console.log(await productManager.addProduct(product6));

    console.log(await productManager.getProducts());

    console.log(await productManager.getProductById(100));

    console.log(await productManager.updateProduct(1, updatedProduct));

    console.log(await productManager.getProducts());

    //console.log(await productManager.deleteProduct(1));

    console.log(await productManager.getProducts());
};

// Ejecucion del test
test()*/