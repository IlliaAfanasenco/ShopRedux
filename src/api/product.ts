import {api} from "./api.ts";

export async function getAllProducts() {
    const res = await api.get("/products")
    return res.data.products
}

export async function getOneProduct(id: number) {
    const res = await api.get(`/products/${id}`)
    return res.data
}