import mongoose, { Schema, model } from "mongoose"

const cartsSchema = new Schema({
    product: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            require: true,
        },
    quantity: {
        type: Number,
        required: true
        }
    }]
})

export const cartsModel = mongoose.model('Carts', cartsSchema);