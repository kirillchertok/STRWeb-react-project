import FeedbackService from "../services/feedback-service.js"

export default class FeedbackController{
    static async get(req, res, next){
        try{
            const feedbacks = await FeedbackService.getAll()
            if (!feedbacks) return res.status(500).json({message: 'Server error'})
            return res.json(feedbacks)
        }
        catch (e){
            next(e)
        }
    }

    static async create(req, res, next){
        try{
            const { userLogin, text, rate } = req.body
            const feedback = await FeedbackService.create(userLogin, text, rate)
            if (!feedback) return res.status(500).json({message: 'Server error'})
            return res.json(feedback)
        }
        catch (e){
            next(e)
        }
    }
}