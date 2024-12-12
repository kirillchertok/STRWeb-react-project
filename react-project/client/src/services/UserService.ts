import $api from '../http/index.ts'
import { IAuthResponse } from '../models/responses/IAuthResponse.ts'

export default class UserService{
    static async login(login: string, password: string){
        return $api.post<IAuthResponse>('/login', { login, password }, { withCredentials: true })
    }

    static async registration(login: string, password: string, secondPassword: string, role: string){
        return $api.post<IAuthResponse>('/registration', { login, password, secondPassword, role }, { withCredentials: true })
    }

    static async logout(id: string) {
        return $api.post('/logout', {id: id}, { withCredentials: true })
    }
}