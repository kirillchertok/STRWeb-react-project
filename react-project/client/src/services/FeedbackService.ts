import $api from "../http";
import { IFeedback } from "../models/IFeedback";

export default class FeedbackService{
    static async getFeedbacks(){
        return await $api.get<IFeedback[]>('/feedbacks')
    }

    static async createFeedback(userLogin: string, text: string, rate: number) {
        return await $api.post('/create-feedback', { userLogin, text, rate }, { withCredentials: true });
    }
}