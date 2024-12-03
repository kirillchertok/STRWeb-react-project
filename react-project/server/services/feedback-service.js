import feedbackModel from "../models/feedback-model.js"

export default class FeedbackService{
    static async getAll(){
        const feedbacks = await feedbackModel.find()
        return feedbacks
    }

    static async create(userId, text, rate){
        if (!userId || !text || !rate) return null 
        const feedback = await feedbackModel.create({ userId: userId, rate: rate, text: text })
        return feedback
    }
}