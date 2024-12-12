import $api from "../http";
import { INews } from "../models/INews";

export default class NewsService{
    static async getNews(){
        return await $api.get<INews[]>('/news')
    }

    static async createNews(authorId: string, text: string, title: string) {
        return await $api.post('/create-news', { authorId, text, title }, { withCredentials: true });
    }
}