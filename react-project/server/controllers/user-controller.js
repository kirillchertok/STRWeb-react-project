import UserService from "../services/user-service.js";

export default class UserController{
    static async registration(req, res, next){
        try{
            const { login, password, secondPassword, role } = req.body
            console.log(login, password ,secondPassword , role)
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
            console.log(id)
            const data = await UserService.logout(id)
            if (!data) return res.status(500).json({message: 'Server error'})
            res.clearCookie('refreshToken');
            return res.json(data.token);
        }
        catch (e){
            next(e)
        }
    }

    static async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const data = await UserService.refresh(refreshToken)
            if (!data) return res.status(500).json({message: 'Server error'})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data)
        }
        catch (e){
            next(e)
        }
    }

    static async getUsers(req, res, next){
        try{
            const data = await UserService.getUsers()
            if (!data) return res.status(500).json({message: 'Server error'})
            return res.json(data)
        }
        catch (e){
            next(e)
        }
    }
}