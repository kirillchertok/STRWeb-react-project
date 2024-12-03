import UserService from "../services/user-service.js";

export default class UserController{
    static async registration(req, res, next){
        try{
            const { login, password, secondPassword, role } = req.body
            const data = await UserService.registration(login, password, secondPassword, role);
            if (!data) return res.status(500).json({message: 'Server error'})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data)
        }
        catch (e){
            next(e);
        }
    }

    static async login(req, res, next){
        try{
            const { login, password } = req.body
            const data = await UserService.login(login, password)
            if (!data) return res.status(500).json({message: 'Server error'})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data)
        }
        catch (e){
            next(e)
        }
    }

    static async logout(req, res, next){
        try{
            const { id } = req.body
            const data = await UserService.logout(id)
            if (!data) return res.status(500).json({message: 'Server error'})
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch (e){
            next(e)
        }
    }

    static async refresh(req, res, next){
        try{
            const { id } = req.body
            const data = await UserService.refresh(id)
            if (!data) return res.status(500).json({message: 'Server error'})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data)
        }
        catch (e){
            next(e)
        }
    }
}