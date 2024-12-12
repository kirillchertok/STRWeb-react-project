import ProductService from "../services/products-service.js"

export default class ProductController{
    static async get(req, res, next){
        try{
            const products = await ProductService.getAll()
            if (!products) return res.status(500).json({message: 'Server error'})
            return res.json(products)
        }
        catch (e){
            next(e)
        }
    }

    static async create(req, res, next){
        try{
            const { userId, productName, price, description, img } = req.body
            const product = await ProductService.create(userId, productName, price, description, img)
            if (!product) return res.status(500).json({message: 'Server error'})
            return res.json(product)
        }
        catch (e){
            next(e)
        }
    }

    static async update(req, res, next){
        try{
            const { userId, productId, productName, price, description, img } = req.body
            const product = await ProductService.update(userId, productId, productName, price, description, img)
            if (!product) return res.status(500).json({message: 'Server error'})
            return res.json(product)
        }
        catch (e){
            next(e)
        }
    }
    
    static async delete(req, res, next){
        try{
            const { productId } = req.params
            const product = await ProductService.delete(productId)
            if (!product) return res.status(500).json({message: 'Server error'})
            return res.json(product)
        }
        catch (e){
            next(e)
        }
    }
}