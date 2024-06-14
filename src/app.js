import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';

import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import MongoProductManager from './dao/mongoDb/mongoProductManager.js';
import MongoCartManager from './dao/mongoDb/mongoCartManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer);

const PORT = 8080;

// Middleware para permitir formato JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para agregar la instancia de io al objeto de solicitud
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);
app.use('/api/users', userRoutes);

// Inicialización del servidor de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('createProduct', async (product) => {
        try {
            const newProduct = await MongoProductManager.addProduct(product);
            const products = await MongoProductManager.getProducts();
            io.emit('updateProducts', products); // Emite la lista actualizada de productos
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await MongoProductManager.deleteProduct(id);
            const products = await MongoProductManager.getProducts();
            io.emit('updateProducts', products); // Emite la lista actualizada de productos
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
        }
    });

    socket.on('addProductToCart', async ({ productId, userId }) => {
        try {
            // Llamar a la función para agregar producto al carrito
            let cart = await MongoCartManager.addProductToCart(userId, productId);

            // Emitir evento de carrito actualizado
            io.to(socket.id).emit('cartUpdated', cart);
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error.message);
        }
    });


    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Conexión a la base de datos
mongoose.connect("mongodb+srv://Arnaldo:qweasd@cluster0.week34v.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch(error => console.error("Error en la conexión: ", error));

// Iniciar el servidor
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
