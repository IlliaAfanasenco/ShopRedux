import {configureStore} from "@reduxjs/toolkit";
import productListSlice from "./productListSlice.ts";

export const store = configureStore({
    reducer: {
        products: productListSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch