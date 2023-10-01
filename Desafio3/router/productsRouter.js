import { Router } from "express";
const ProductManager = require('../ProductManager');
const path = require('path');

const productManager = new ProductManager(path.resolve(__dirname, 'productos.json'));
const router = Router();

app.get('/', async (req, res) => {
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

app.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    const producto = await productManager.getProductById(pid);
    
    if (producto == "Not found") {
        res.status(404).json("El producto no existe");
    }
    else {
        res.status(200).json({producto});
    }
});

app.post('/', async (req, res) => {
    try{
        const body = req.body;
        const producto = await productManager.addProduct(body);
        res.status(200).json({producto});
    }
    catch(error) {
        res.status(400).json({"No se pudo publicar el producto": error});
    }
});

app.put('/:pid', async (req, res) => {
    try{
        const {pid} = req.params;
        const body = req.body;
        const producto = await productManager.updateProduct(pid, body);
        res.status(200).json({producto});
    }
    catch(error) {
        res.status(400).json({"No se pudo actualizar el producto": error});
    }
});

app.listen(8080, () => {
    console.log('Servidor levantado en el puerto 8080');
});

app.delete('/:pid', async (req, res) => {
    try{
        const {pid} = req.params;
        const producto = await productManager.deleteProduct(pid);
        res.status(200).json({producto});
    }
    catch(error) {
        res.status(400).json({"No se pudo eliminar el producto": error});
    }
});