import { Server } from "socket.io";
import { messageManager } from "../dao/db/MessageManager.js";

const Websocket = (httpServer) => {

    const server = new Server(httpServer)

    const chatSocket = server.of('/chat');

    chatSocket.on("connection", async (socket) => {
        
        socket.on('newUser', async (user) => {
            socket.broadcast.emit('newUserBroadcast', user)
        });

        // Nuevo mensaje del chat
        socket.on('newMessage', async (socket) => {
            try {
                const newMsg = await messageManager.createOne(message);
                chatSocket.emit('messageCreated', newMsg);
            } catch (error) {
                socket.emit('error', "No se pudo enviar el mensaje");
            }
        });
    })

    const productSocket = server.of('/products');

    productSocket.on("connection", async (socket) => {
        // Obtengo todos los productos
        try {
            const products = await productManager.findAll();
            socket.emit('products', products);
        } catch (error) {
            socket.emit('error', "No se pudieron obtener los productos");
        }

        // Nuevo producto
        socket.on('newProduct', async (product) => {
            try {
                const newProduct = await productManager.createOne(product);
                productSocket.emit('productCreated', newProduct);
            } catch (error) {
                socket.emit('error', "No se pudo crear el producto");
            }
        });

        // Actualizar producto
        socket.on('updateProduct', async (product) => {
            try {
                const updatedProduct = await productManager.updateOne(product);
                productSocket.emit('productUpdated', updatedProduct);
            } catch (error) {
                socket.emit('error', "No se pudo actualizar el producto");
            }
        });

        // Borrar producto
        socket.on('deleteProduct', async (product) => {
            try {
                const deletedProduct = await productManager.deleteOne(product);
                productSocket.emit('productDeleted', deletedProduct);
            } catch (error) {
                socket.emit('error', "No se pudo borrar el producto");
            }
        })
    });

    return server;
}

export default Websocket
