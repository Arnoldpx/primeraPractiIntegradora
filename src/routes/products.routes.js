// routes/product.routes.js
import { Router } from 'express';
import fileSystemProductManager from '../dao/fileSystem/productManager.js';
import MongoProductManager from '../dao/mongoDB/mongoProductManager.js';

const router = Router();

// Rutas para FileSystem

router.get('/products', async (req, res) => {
  try {
    const products = await fileSystemProductManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await fileSystemProductManager.getProductById(parseInt(req.params.id));
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    await fileSystemProductManager.addProduct(req.body);
    res.status(201).json({ message: 'Producto añadido' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    await fileSystemProductManager.updateProduct(parseInt(req.params.id), req.body);
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await fileSystemProductManager.deleteProduct(parseInt(req.params.id));
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para MongoDB

router.get('/api/mongo/products', async (req, res) => {
  try {
    const products = await MongoProductManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/api/mongo/products/:id', async (req, res) => {
  try {
    const products = await MongoProductManager.getProductById(req.params.id);
    res.send({result: "success", payload: products})
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.post('/api/mongo/products', async (req, res) => {
  try {
    const newProduct = await MongoProductManager.addProduct(req.body);
    res.send({result: "success", payload: newProduct})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/api/mongo/products/:id', async (req, res) => {
  try {
    const updatedProduct = await MongoProductManager.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/api/mongo/products/:id', async (req, res) => {
  try {
    const deletedProduct = await MongoProductManager.deleteProduct(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
