import cartsRouter from './routes/productCart.js';
import productsRouter from './routes/productRouter.js';
const express = require ('express');
const app = express();
const path = require('path');
const {ProductManager} = require('./ProductManager');

const productManager = new ProductManager(path.resolve(__dirname, 'productos.json'));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);