import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    login: { type: String, require: true, unique: true },
    regDate: { type: String, default: Date.now() },
    role: { type: String, default: 'user' },
    balance: { type: Number, default: 0 },
    password: { type: String, required: true }
})

export default model('User', UserSchema)