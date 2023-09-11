const express = require ('express');

const app = express();

const {ProductManager} = require('./Desafio3');

const productManager = new ProductManager('./productos.json');

app.get('/products', (req, res) => {
    const productos = productManager.getProducts();
    const query = req.query;
    console.log(query);
});

app.listen(8080, () => {
    console.log('Servidor levantado en el puerto 8080');
});