/**
 * Created by: Omar Ihab
 * This file contains the category slice of the redux store.
 */

/**
 * Import necessary modules
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "../../models/ICategory";
/**
 * Create an async thunk to fetch categories from the JSON server.
 * The thunk returns a promise that resolves to the fetched data.
 */
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        /**
         * Fetch the categories from the JSON server.
         * @return {Promise<ICategory[]>} A promise that resolves to the fetched data.
         */
        const fetchData = async (): Promise<ICategory[]> => {
            const response = await fetch("http://localhost:3000/categories");
            const data = await response.json();
            return data;
        };
        return fetchData();
    }
);
/**
 * The initial state of the category slice.
 *
 */
const initialState = {
    /**
     * An array of ICategory objects representing the categories.
     *
     * @type {ICategory[]}
     */
    categories: [] as ICategory[],

    /**
     * A string representing the status of the categories.
     *
     * @type {string}
     */
    status: "idle",
};

/**
 * The category slice of the redux store.
 */
export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
            });
    }
});
export default categorySlice.reducer;
