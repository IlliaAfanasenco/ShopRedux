import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Product} from "../types/product.ts";
import {getAllProducts} from "../api/product.ts";

export type ProductState = {
    products: Product[],
    loading: boolean,
    error: null | string
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

export const loadProducts = createAsyncThunk("products/loadProducts", async ()=>{
    const data = await getAllProducts()
    return data
})

const productListSlice = createSlice({
    name:'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadProducts.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loadProducts.fulfilled, (state, action)=>{
                state.loading = false
                state.products = action.payload
            })
            .addCase(loadProducts.rejected, (state, action)=>{
                state.loading = false
                state.error = action.error.message ?? 'Error'
            })
    }
})

export default productListSlice.reducer