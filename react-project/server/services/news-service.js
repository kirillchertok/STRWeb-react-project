import newsModel from "../models/news-model.js";
import userModel from "../models/user-model.js";

export default class NewsService{
    static async getAll(){
        const news = await newsModel.find()
        return news
    }

    static async create(title, text, authorId){
        if (!title || !text || !authorId) return null

        const user = await userModel.findOne({login: authorId})
        if(user.role !== 'admin') return null

        const news = await newsModel.create({ title: title, text: text, author: authorId })
        return news
    }
}