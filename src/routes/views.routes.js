import express from 'express';
import productManager from '../dao/fileSystem/productManager.js';


const router = express.Router();

router.get('/', async (req, res) => {
    await productManager.init();
    const products = productManager.getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    await productManager.init();
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

router.get('/', (req, res) => {
    res.render('chat', {})
})

export default router;
