import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Cart} from "../types/cart.ts";
import {addToCart} from "../api/cart.ts";

type CartState = {
    items: Cart | null,
    loading: boolean,
    error: string | null
}

const initialState: CartState = {
    items: null,
    loading: false,
    error: null
}

export const addProductToCart = createAsyncThunk<Cart, {
    productId: number,
    quantity: number
}>("cart/addProductToCart", async ({productId, quantity}) => {
    const data = await addToCart(1,productId, quantity)
    return data
})
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addProductToCart.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.error = null
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Error'
            })
    }
})

export default cartSlice.reducer