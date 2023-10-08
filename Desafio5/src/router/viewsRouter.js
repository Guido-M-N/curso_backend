import { Router } from "express";
import { productManager } from "../ProductManager.js";
import { socketServer } from "../app.js";

const router = Router();

router.get('/home', async (req, res) => {
    const products = await productManager.getProducts({});
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    socketServer.on("connection", socket => { 
        socket.emit("getProducts", products);
     });
    res.render('realTimeProducts');
});

export default router;