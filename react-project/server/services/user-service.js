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

        const hashedPassword = await bcrypt.hash(password, 3)
        const newUser = await userModel.create({ login: login, password: hashedPassword, role: role })
        if (!newUser) return null

        const tokens = await TokenService.createTokens(newUser._id)
        await TokenService.addToken(newUser._id, tokens.refreshToken)

        return { newUser, ...tokens }
    }

    static async logout(id){
        if(!id) return null
        
        const user = await userModel.findById(id)
        if (!user) return null
        const token = await TokenService.getToken(id)
        if (!token) return null

        return await TokenService.deleteToken(token.refreshToken)
    }

    static async refresh(refreshToken){
        if (!refreshToken) return null

        const userData = TokenService.verifyRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            return null
        }
        const user = await userModel.findById(userData.id);
        const tokens = await TokenService.createTokens(userData.id);

        await TokenService.addToken(user._id, tokens.refreshToken)
        return {...tokens, user}
    }
}