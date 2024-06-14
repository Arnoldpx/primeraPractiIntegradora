import { Router } from 'express';
import fileSystemCartManager from '../dao/fileSystem/cartManager.js';
import MongoCartManager from '../dao/mongoDB/mongoCartManager.js';

const router = Router();

// Crear una instancia de MongoCartManager
const cartManager = new MongoCartManager();

// Rutas para FileSystem

// Ruta para obtener un carrito por su ID (FileSystem)
router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await fileSystemCartManager.getCartById(parseInt(req.params.cid));
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para añadir un producto a un carrito (FileSystem)
router.post('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await fileSystemCartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para crear un nuevo carrito (FileSystem)
router.post('/carts', async (req, res) => {
    try {
        const newCart = await fileSystemCartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rutas para MongoDB

// Ruta para agregar un nuevo producto
router.post('/productos', async (req, res) => {
    try {
        // Asumiendo que 'Producto' está importado y definido correctamente en otro archivo
        const producto = newproducto(req.body);
        await producto.save();
        res.status(201).send(producto);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ruta para agregar un producto al carrito
router.post('/carrito/:userId/productos', async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        const carrito = await cartManager.addProductToCart(userId, productId);
        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error adding product to cart:', error.message);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

// Ruta para crear un nuevo carrito
router.post('/carrito', async (req, res) => {
    try {
        const carrito = await MongoCartManager.createCart();
        res.status(201).json(carrito);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener un carrito por su ID
router.get('/carrito/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const carrito = await MongoCartManager.getCart(id);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;






