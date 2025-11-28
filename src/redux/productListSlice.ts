import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Product} from "../types/product.ts";
import {getAllCategory, getAllProducts, getOneProduct, searchProduct} from "../api/product.ts";

export type ProductState = {
    products: Product[],
    loading: boolean,
    selected: Product | null,
    error: null | string
    categories: string[]
}

const initialState: ProductState = {
    products: [],
    selected: null,
    loading: false,
    error: null,
    categories: []
}

export const loadProducts = createAsyncThunk("products/loadProducts", async () => {
    const data = await getAllProducts()
    return data
})

export const loadProductById = createAsyncThunk("products/loadProductById", async (id: number) => {
    const data = await getOneProduct(id)
    return data
})

export const productSearch = createAsyncThunk("products/productSearch", async (query: string) => {
    const data = await searchProduct(query)
    return data
})

export const loadCategory = createAsyncThunk("products/loadCategory", async () => {
    const data = await getAllCategory()
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
            .addCase(productSearch.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(productSearch.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(productSearch.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? "Error"
            })
            .addCase(loadCategory.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loadCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(loadCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Error'
            })
    }
})

export default productListSlice.reducer