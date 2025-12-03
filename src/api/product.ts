import {api} from "./api.ts";

export async function getAllProducts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    const res = await api.get("/products", {
        params: {limit, skip}
    })
    return res.data
}

export async function getOneProduct(id: number) {
    const res = await api.get(`/products/${id}`)
    return res.data
}

export async function searchProduct(query: string, page: number, limit: number) {
    const skip = (page - 1) * limit
    const res = await api.get(`/products/search`, {
        params: {q: query, limit, skip}
    })
    return res.data
}

export async function getAllCategory() {
    const res = await api.get("/products/category-list")
    return res.data

}

export async function getProductByCategory(category: string, page: number, limit: number) {
    const skip = (page - 1) * limit
    const res = await api.get(`/products/category/${category}`, {params: {limit, skip}})
    return res.data
}