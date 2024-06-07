import { configureStore } from "@reduxjs/toolkit";
import collectionSlice from "./slices/collectionSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";

/**
 * The store of the redux store.
 */
const store = configureStore({
    /**
     * The reducer of the redux store.
    */
    reducer: {
        categories: categorySlice,
        products: productSlice,
        collections: collectionSlice
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch;

export default store;