import { Router } from "express";

const router = Router();

const prueba = {
    nombre: 'guido',
    apellido: 'navia'
}

router.get('/', (req, res) => {
    console.log("viewsRouter")
    res.render('index', {});
});

router.get('/products/view', (req, res) => {
    console.log("viewsProducts")
    res.render('home', { productos: prueba });
});

export default router;