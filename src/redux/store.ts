import {configureStore} from "@reduxjs/toolkit";
import productListSlice from "./productListSlice.ts";
import cartSlice from "./cartSlice.ts";

export const store = configureStore({
    reducer: {
        products: productListSlice,
        cart: cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch