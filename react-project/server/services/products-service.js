import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";

export default class ProductService{
    static async getAll(){
        const products = await productModel.find()
        return products
    }

    static async create(userId, productName, price, description, img){
        if (!userId || !productName || !price || !description || !img) return null

        const user = await userModel.findById(userId)
        if(!user || user.role !== 'admin') return null

        const product = await productModel.create({ productName: productName, price: price, description: description, img: img })
        return product
    }

    static async update(userId, productId, productName, price, description, img){
        if (!userId || !productId || !productName || !price || !description || !img) return null

        const user = await userModel.findById(userId)
        if(!user || user.role !== 'admin') return null

        const product = await productModel.findByIdAndUpdate({ _id: productId }, { productName: productName, price: price, description: description, img: img })
        return product
    }

    static async delete(productId){
        const product = await productModel.deleteOne({ _id: productId })
        return product
    }
}