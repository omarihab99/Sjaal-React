import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICollection } from "../../models/ICollection";
import axios from "axios";
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
        const response = await axios.get(URL);
        return response.data;
    }
)
// /**
//  * This is the action responsible for getting a collection by its id.
//  * @param {categoryId} - The id of the category to be fetched the collection belongs to.
//  */
// export const getCollectionByCategoryId = createAsyncThunk(
//     "collections/getCollectionById",
//     /**
//      * Get the collection from the JSON server by id.
//      * @param categoryId - The id of the category to fetch the collection belongs to.
//      * @returns {Promise<ICollection>} A promise that resolves to the fetched data.
//      */
//     async (categoryId: string): Promise<ICollection> => {
//         const response = await axios.get(`${URL}?categoryId=${categoryId}`);
//         return response.data;
//     }
// )

/**
 * This is the action responsible for getting a collection by its id.
 * @param {collectionId} - The id of the collection to fetch the collection.
 */
export const getCollectionById = createAsyncThunk(
    "collections/getCollectionById",
    /**
     * Get the collection from the JSON server by id.
     * @param collectionId - The id of the category to fetch the collection belongs to.
     * @returns {Promise<ICollection>} A promise that resolves to the fetched data.
     */
    async (collectionId: string) => {
        try {
            const response = await axios.get(`${URL}?id=${collectionId}`);
            console.log(response);
            
            return response.data;
        } catch (error) {
            throw error;
        }
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
            // .addCase(getCollectionByCategoryId.fulfilled, (state, action) => {
            //     state.collection = action.payload;
            // })
            .addCase(getCollectionById.fulfilled, (state, action) => {
                state.collection = action.payload;
            })
    }
})

export default collectionSlice.reducer;