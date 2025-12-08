import {api} from "./api.ts";



export async function addToCart(userId:number = 1, productId: number, quantity: number = 1){
    const res = await api.post(`/carts/add`, {
        userId, products: [{id: productId, quantity}]
    })
    return res.data
}