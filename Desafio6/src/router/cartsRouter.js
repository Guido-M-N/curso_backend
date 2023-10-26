import { Router } from 'express';
import cartManager from '../dao/db/CartManager.js';

const router = Router();

router.post('/', async(req, res) => {
    try {
        const cart = await cartManager.createOne();
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(400).json("No se pudo crear el carrito")
    }
});

router.get('/:cid', async(req,res) => {
    const {cid} = req.params
    try {
        const cart = await cartManager.findById(cid)
        if (cart == -1) res.status(404).json("El carrito no existe");
        return res.status(200).json(cart.products)
    } catch (error) {
        return res.status(400).json("No se pudo concretar la solicitud")
    }
});

router.post('/:cid/product/:pid', async(req,res) => {
    const {cid} = req.params
    const {pid} = req.params
    console.log(cid)
    console.log(pid)
    try {
        const cartProduct = await cartManager.addProductToCart(cid, pid)
        console.log(cartProduct)
        if (cartProduct == -1) return res.status(404).json("El producto no existe");
        return res.status(200).json(cartProduct)
    } catch (error) {
        return error
    }
});

export default router;