import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartsRouter from "./router/cartsRouter.js";
import productsRouter from "./router/productsRouter.js";
import viewsRouter from './router/viewsRouter.js';
import { Server } from 'socket.io';

console.log(__dirname + "/views");
const app = express();

app.engine('handlebars', handlebars.engine());
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Servidor levantado en el puerto 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!');
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor');
});