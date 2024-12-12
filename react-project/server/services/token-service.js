import { config } from "dotenv";
import tokenModel from "../models/token-model.js";
import jwt from 'jsonwebtoken'

config()

export default class TokenService{
    static async getToken(id){
        const token = await tokenModel.findOne({ userId: id })
        return token
    }

    static async findToken (refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData;
    }

    static createTokens(id){
        const accessToken = jwt.sign({ id: id }, process.env.SECRET_KEY_ACCESS, { expiresIn: '1h' })
        const refreshToken = jwt.sign({ id: id }, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    static verifyAccessToken(accessToken){
        try{
            const flag = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS)
            return flag
        }
        catch (e){
            return null
        }
    }

    static verifyRefreshToken(accessToken){
        try{
            const flag = jwt.verify(accessToken, process.env.SECRET_KEY_REFRESH)
            return flag
        }
        catch (e){
            return null
        }
    }

    static async addToken(userId, refreshToken){
        const token = await tokenModel.findOne({ userId: userId.toString() })
        if (token){
            token.refreshToken = refreshToken
            return token.save()
        }
        const newToken = await tokenModel.create({ userId: userId, refreshToken: refreshToken })
        return newToken
    }

    static async deleteToken(refreshToken){
        const token = await tokenModel.deleteOne({ refreshToken: refreshToken })
        return token
    }

    static async newAccessToken(refreshToken){
        if (!refreshToken) return null
        const token = await tokenModel.findOne({ refreshToken: refreshToken })
        if (!token) return null
        return this.createTokens().accessToken
    }
}