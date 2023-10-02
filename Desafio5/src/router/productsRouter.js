import { Router } from 'express';
import { productManager } from '../ProductManager.js';

const router = Router();

router.get('/', async (req, res) => {
    let productos = await productManager.getProducts();
    const query = req.query;

    if (query.limit) {
        productos = productos.slice(0, query.limit);
        return res.status(200).json({productos});
    }
    else {
        return res.status(200).json({productos});
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const producto = await productManager.getProductById(pid);
        if (producto == -1) res.status(404).json("El producto no existe");
        return res.status(200).json({producto});
    }
    catch(error) {
        return res.status(400).json({"No se pudo encontrar el producto": error})
    }
});

router.post('/', async (req, res) => {
    try{
        const body = req.body;
        const producto = await productManager.addProduct(body);
        return res.status(200).json({producto});
    }
    catch(error) {
        return res.status(400).json({"No se pudo publicar el producto": error});
    }
});

router.put('/:pid', async (req, res) => {
    try{
        const {pid} = req.params;
        const body = req.body;
        const producto = await productManager.updateProduct(pid, body);
        return res.status(200).json({producto});
    }
    catch(error) {
        return res.status(400).json({"No se pudo actualizar el producto": error});
    }
});

router.delete('/:pid', async (req, res) => {
    try{
        const {pid} = req.params;
        const producto = await productManager.deleteProduct(pid);
        return res.status(200).json({producto});
    }
    catch(error) {
        return res.status(400).json({"No se pudo eliminar el producto": error});
    }
});

export default router;