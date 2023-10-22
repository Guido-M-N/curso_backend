import path from 'path';
import __dirname from '../../utils.js';
import { productsModel } from '../models/products.model.js';
import BasicManager from './BasicManager.js';

class ProductManager extends BasicManager{
    constructor() {
        super(productsModel);
    }
}

export const productManager = new ProductManager(path.resolve(__dirname, 'productos.json'));