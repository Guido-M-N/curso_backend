const cartsRouter = require('../router/cartsRouter');
const productsRouter = require('../router/productsRouter');
const express = require ('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require('path');
const {productManager} = require('./ProductManager');

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.listen(8080, () => {
    console.log('Servidor levantado en el puerto 8080');
});