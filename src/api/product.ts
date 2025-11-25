import {api} from "./api.ts";

export async function getAllProducts() {
    const res = await api.get("/products")
    return res.data.products
}