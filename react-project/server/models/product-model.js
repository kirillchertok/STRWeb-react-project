import {model, Schema} from "mongoose";

const ProductSchema = new Schema({
    productName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true }
})

export default model('Product', ProductSchema)