import type {Product} from "./product.ts";

export type CartItem = Product & {
    quantity: number,
    total: number
}

export type Cart = {
    id: number,
    products: CartItem[],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}