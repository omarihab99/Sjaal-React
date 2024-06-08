import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICollection } from "../../models/ICollection";
const URL = "http://localhost:3000/collections";
/**
 * This is the action responsible for fetching collections.
 */
export const fetchCollection  = createAsyncThunk(
    "collections/fetchCollections",
    /**
     * Fetch the collections from the JSON server.
     * @returns {Promise<ICollection[]>} A promise that resolves to the fetched data.
     */
    async (): Promise<ICollection[]> => {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }
)
/**
 * This is the action responsible for getting a collection by its id.
 * @param {categoryId} - The id of the category to be fetched the collection belongs to.
 */
export const getCollectionByCategoryId = createAsyncThunk(
    "collections/getCollectionById",
    /**
     * Get the collection from the JSON server by id.
     * @param categoryId - The id of the category to fetch the collection belongs to.
     * @returns {Promise<ICollection>} A promise that resolves to the fetched data.
     */
    async (categoryId: string): Promise<ICollection> => {
        const response = await fetch(`${URL}?categoryId=${categoryId}`);
        const data = await response.json();
        return data;
    }
)
const initialState = {
    collections: [] as ICollection[],
    collection: {},
    status: "idle",
}
const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchCollection.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCollection.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.collections = action.payload;
            })
            .addCase(fetchCollection.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(getCollectionByCategoryId.fulfilled, (state, action) => {
                state.collection = action.payload;
            })
    }
})

export default collectionSlice.reducer;