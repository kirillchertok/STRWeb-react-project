import feedbackModel from "../models/feedback-model.js"
import userModel from "../models/user-model.js"

export default class FeedbackService{
    static async getAll(){
        const feedbacks = await feedbackModel.find()
        return feedbacks
    }

    static async create(userLogin, text, rate){
        if (!userLogin || !text || !rate) return null 

        const feedback = await feedbackModel.create({ userLogin: userLogin, rate: rate, feedbackText: text })
        return feedback
    }
}