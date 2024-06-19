import express from 'express';
import MongoProductManager from '../dao/mongo/mongoProductManager.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await MongoProductManager.getProducts();  
        res.render('home', { products }); 
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await MongoProductManager.getProducts();  
        res.render('realTimeProducts', { products });  
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});




router.get('/chat', (req, res) => {
    res.render('chat', {});  
});

export default router;
