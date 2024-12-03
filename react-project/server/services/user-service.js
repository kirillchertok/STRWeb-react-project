import userModel from "../models/user-model.js"
import bcrypt from 'bcrypt'
import TokenService from "./token-service.js"

export default class UserService{
    static async getUsers(){
        const users = await userModel.find()
        return users
    }

    static async getUser(id){
        const user = await userModel.findById(id)
        return user
    }

    static async login(login, password){
        if (!login || !password) return null

        const user = await userModel.findOne({ login: login })
        if (!user) return null

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) return null

        const tokens = await TokenService.createTokens(user._id)
        await TokenService.addToken(user._id, tokens.refreshToken)

        return { user, ...tokens }
    }

    static async registration(login, password, secondPassword, role){
        if (password !== secondPassword) return null

        const hashedPassword = bcrypt.hash(password, 3)
        const newUser = await userModel.create({ login: login, password: hashedPassword, role: role })
        if (!newUser) return null

        const tokens = await TokenService.createTokens(user._id)
        await TokenService.addToken(user._id, tokens.refreshToken)

        return { user, ...tokens }
    }

    static async logout(id){
        if(!id) return null
        
        const user = await userModel.findById(id)
        if (!user) return null
        const token = await TokenService.getToken(id)
        if (!token) return null

        return await TokenService.deleteToken(token.refreshToken)
    }

    static async refresh(id){
        if (!id) return null

        const token = await TokenService.getToken(id)
        if (!token || !token.refreshToken) return null

        const tokens = await TokenService.createTokens(user._id)
        await TokenService.addToken(user._id, tokens.refreshToken)

        return { user, ...tokens }
    }
}