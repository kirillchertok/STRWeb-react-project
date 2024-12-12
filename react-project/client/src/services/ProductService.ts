import $api from "../http";

export default class ProductService{
    static async getProducts(){
        return await $api.get('/products')
    }

    static async createProduct(userId: string, productName: string, description: string, price: number, img: string){
        return await $api.post('/create-product', {userId, productName, description, price, img});
    }

    static async editProduct(userId: string, productId: string, productName: string, description: string, price: number, img: string){
        return await $api.put('/update-product', {userId, productId, productName, description, price, img});
    }

    static async deleteProduct(productId: string) {
        return await $api.delete(`/delete-product/${productId}`);
    }
}