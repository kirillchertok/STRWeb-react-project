import newsModel from "../models/news-model.js";
import userModel from "../models/user-model.js";

export default class NewsService{
    static async getAll(){
        const news = await newsModel.find()
        return news
    }

    static async create(title, text, authorId){
        if (!title || !text || !authorId) return null

        const author = await userModel.findById(authorId)
        if (!author) return null

        const news = await newsModel.create({ title: title, text: text, author: author._id })
        return news
    }
}