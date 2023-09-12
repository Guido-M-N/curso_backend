const express = require ('express');

const app = express();

const path = require('path');

const {ProductManager} = require('./Desafio3');

const productManager = new ProductManager(path.resolve(__dirname, 'productos.json'));

app.get('/products', async (req, res) => {
    let productos = await productManager.getProducts();
    const query = req.query;

    if (query.limit) {
        productos = productos.slice(0, query.limit);
        res.status(200).json({productos});
    }
    else {
        res.status(200).json({productos});
    }

    console.log(query);
});

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params;
    const producto = await productManager.getProductById(pid);
    
    if (producto == "Not found") {
        res.status(404).json("El producto no existe");
    }
    else {
        res.status(200).json({producto});
    }
});

app.listen(8080, () => {
    console.log('Servidor levantado en el puerto 8080');
});