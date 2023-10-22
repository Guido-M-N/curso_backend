import express from 'express';
import __dirname from './utils.js';
import "./db/config.js";
import handlebars from 'express-handlebars';
import cartsRouter from "./router/cartsRouter.js";
import productsRouter from "./router/productsRouter.js";
import viewsRouter from './router/viewsRouter.js';
import Websocket from './sockets/socket.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');

// Endpoints
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Servidor levantado en el puerto 8080');
});

const socketServer = Websocket(httpServer)