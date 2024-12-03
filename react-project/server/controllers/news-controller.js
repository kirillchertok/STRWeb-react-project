import NewsService from "../services/news-service.js"

export default class NewsController{
    static async get(req, res, next){
        try{
            const news = await NewsService.getAll()
            if (!news) return res.status(500).json({message: 'Server error'})
            return res.json(news)
        }
        catch (e){
            next(e)
        }
    }

    static async create(req, res, next){
        try{
            const { title, text, authorId } = req.body
            const news = await NewsService.create(title, text, authorId)
            if (!news) return res.status(500).json({message: 'Server error'})
            return res.json(news)
        }
        catch (e){
            next(e)
        }
    }
}