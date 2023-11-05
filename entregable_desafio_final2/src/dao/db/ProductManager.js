import path from 'path';
import __dirname from '../../utils.js';
import { productsModel } from '../models/products.model.js';
import BasicManager from './BasicManager.js';

class ProductManager extends BasicManager{
    constructor() {
        super(productsModel);
    }

    async findAllProducts(obj){
        const {limit, page, sort, ...queryFilter} = obj
        
        try{
            const options = {
                limit: limit ? limit : 5,
                page: page ? page : 1,
                sort: (sort === 'asc' || sort === 'desc') ? {price: sort == 'asc' ? 1 : 0 }: null
            }

            const result = await this.model.paginate(queryFilter ? queryFilter : {}, options ? options : {})
            
            const info = {
                status: 'success',
                payload: result.docs.map(doc => doc.toObject()), 
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevPage ? 
                `http://localhost:8080/api/products?page=${result.prevPage}&limit=${options.limit}` : null,
                nextLink: result.nextPage ? 
                `http://localhost:8080/api/products?page=${result.nextPage}&limit=${options.limit}` : null,
            }

            return info
        }

        catch(error){
            return error
        }
    }
}

export const productManager = new ProductManager(path.resolve(__dirname, 'productos.json'));