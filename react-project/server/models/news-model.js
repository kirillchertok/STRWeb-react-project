import {model, Schema} from "mongoose";

const NewsSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: String, required: true }
});

export default model('News', NewsSchema)