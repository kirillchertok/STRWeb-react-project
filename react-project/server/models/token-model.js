import {model, Schema} from "mongoose";

const TokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
});

export default model('Token', TokenSchema)