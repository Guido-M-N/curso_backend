import { Router } from "express";

const router = Router();

router.get('/home', async (req, res) => {
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

router.get('/chat', async (req, res) => {
    return res.render('chat');
});

export default router;