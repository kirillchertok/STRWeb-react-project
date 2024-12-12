import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";
import axios from "axios";
import { IAuthResponse } from "../models/responses/IAuthResponse";
import { API_URL } from "../http";
import FeedbackService from "../services/FeedbackService";
import ProductService from "../services/ProductService";
import NewsService from "../services/NewsService";

export default class Store{
    user = {} as IUser;
    googleUser = '';
    isAuth = false;
    isOpenAuth = false;
    currentAuthOption = true

    constructor(){
        makeAutoObservable(this)
    }

    setIsOpenAuth(state: boolean){
        this.isOpenAuth = state
    }

    setCurrentAuthOption(state: boolean){
        this.currentAuthOption = state
    }

    setIsAuth(state: boolean){
        this.isAuth = state
    }

    setUser(user: IUser){
        this.user = user
    }

    setGoogleUser(state: string){
        this.googleUser = state
    }

    async login(login: string, password: string) {
        try {
            const response = await UserService.login(login, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            console.log(response.data.user)
            this.setIsAuth(true);
            this.setUser(response.data.user);
            localStorage.setItem('role', this.user.role)
            // if(response.status === 200) {
            //     window.location.replace('http://localhost:5173/')
            // }
            return response.data
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(login: string, password: string, secondPassword: string, role = 'user') {
        try {
            const response = await UserService.registration(login, password, secondPassword, role);
            console.log(response.data)
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
            if(response.status === 200) {
                window.location.replace('http://localhost:5173/')
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout(id) {
        try {
            const response = await UserService.logout(id);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            this.setIsAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth () {
        // this.setLoading(true);
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
            this.setIsAuth(true)
        } catch(e: any) {
            console.log(e.response?.data?.message);
        } finally {
            // this.setLoading(false);
        }
    }

    async getFeedbacks() {
        try {
            const response = await FeedbackService.getFeedbacks()
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async createFeedback(userId: string, text: string, rate: number) {
        try {
            const response = await FeedbackService.createFeedback(userId, text, rate);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async createProduct(userId: string, name: string, description: string, price: number, image: string) {
        try {
            const response = await ProductService.createProduct(userId, name, description, price, image);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async getProducts() {
        try {
            const response = await ProductService.getProducts();
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async editProduct(userId: string, productId: string, name: string, description: string, price: number, image: string) {
        try {
            const response = await ProductService.editProduct(userId, productId, name, description, price, image);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteProduct(productId: string) {
        try {
            const response = await ProductService.deleteProduct(productId);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async getNews(){
        try{
            const news = await NewsService.getNews()
            return news.data
        }
        catch (e){
            console.log(e.response?.data?.message);
        }
    }

    async createNews(authorId: string, text: string, title: string){
        try{
            const news = await NewsService.createNews(authorId, text, title)
            return news.data
        }
        catch (e){
            console.log(e.response?.data?.message);
        }
    }
}