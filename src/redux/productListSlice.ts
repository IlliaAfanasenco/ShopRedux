import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Product} from "../types/product.ts";
import {getAllProducts, getOneProduct} from "../api/product.ts";

export type ProductState = {
    products: Product[],
    loading: boolean,
    selected: Product | null,
    error: null | string
}

const initialState: ProductState = {
    products: [],
    selected: null,
    loading: false,
    error: null
}

export const loadProducts = createAsyncThunk("products/loadProducts", async () => {
    const data = await getAllProducts()
    return data
})

export const loadProductById = createAsyncThunk("products/loadProductById", async (id:number) => {
    const data = await getOneProduct(id)
    return data
})

const productListSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadProducts.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Error'
            })
            .addCase(loadProductById.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loadProductById.fulfilled, (state, action) => {
                state.loading = false
                state.selected = action.payload
            })
            .addCase(loadProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? "Error"
            })
    }
})

export default productListSlice.reducer