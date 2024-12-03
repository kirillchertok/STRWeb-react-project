import {model, Schema} from "mongoose";

const FeedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rate: { type: Number, required: true },
    feedbackText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model('Feedback', FeedbackSchema)