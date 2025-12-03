import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Product, ProductResponce} from "../types/product.ts";
import {getAllCategory, getAllProducts, getOneProduct, getProductByCategory, searchProduct} from "../api/product.ts";

export type ProductState = {
    products: Product[],
    loading: boolean,
    selected: Product | null,
    error: null | string,

    selectedCategory: string | null
    categories: string[]
    query: string | null

    page: number
    limit: number
    total: number
}

const initialState: ProductState = {
    products: [],
    selected: null,
    loading: false,
    selectedCategory: null,
    error: '',
    categories: [],
    query: null,

    page: 1,
    limit: 10,
    total: 0
}

export const loadProducts = createAsyncThunk<ProductResponce, {
    page: number;
    limit: number
}>("products/loadProducts", async (params) => {
    const page = params.page ?? 1
    const limit = params.limit ?? 10

    const data = await getAllProducts(page, limit)
    return data
})

export const loadProductById = createAsyncThunk("products/loadProductById", async (id: number) => {
    const data = await getOneProduct(id)
    return data
})

export const productSearch = createAsyncThunk<ProductResponce, {
    query: string;
    page: number;
    limit: number
}>("products/productSearch", async ({query, page = 1, limit = 10}) => {
    const data = await searchProduct(query, page, limit)
    return data
})

export const loadCategory = createAsyncThunk("products/loadCategory", async () => {
    const data = await getAllCategory()
    return data
})

export const loadByProductCategory = createAsyncThunk<ProductResponce, {
    category: string,
    page: number,
    limit: number
}>
("products/loadByProductCategory", async ({category, page, limit}) => {
    const data = await getProductByCategory(category, page, limit)
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
                state.products = action.payload.products
                state.total = action.payload.total
                state.limit = action.meta.arg.limit ?? state.limit
                state.page = action.meta.arg.page
                state.selectedCategory = null
                state.query = ''
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
                state.products = action.payload.products
                state.total = action.payload.total
                state.limit = action.meta.arg.limit
                state.page = action.meta.arg.page
                state.query = action.meta.arg.query

                state.selectedCategory = null
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
            .addCase(loadByProductCategory.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loadByProductCategory.fulfilled, (state, action) => {
                state.loading = false
                state.selectedCategory = action.meta.arg.category
                state.products = action.payload.products
                state.total = action.payload.total
                state.limit = action.meta.arg.limit
                state.page = action.meta.arg.page
                state.query = ""
            })
            .addCase(loadByProductCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Error'
            })
    }
})

export default productListSlice.reducer