export type Product = {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    rating: number,
}

export type ProductResponce = {
    products: Product [],
    total: number,
    skip: number,
    limit: number,
    query: string
}