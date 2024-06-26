import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct";
import axios from "axios";

const URL = "http://localhost:3000/products";
/**
 * This is the action responsible for fetching products by its collection id.
 * @param collectionId - The id of the collections to fetch products from.
 */
export const fetchProductsByCollectionId = createAsyncThunk(
    "products/fetchProductsByCollectionId",
    /**
     * Fetch the products from the JSON server by collection id.
     * @param collectionId - The id of the collection to fetch products from.
     * @returns {Promise<IProduct[]>} A promise that resolves to the fetched data.
     */
    async (collectionId: string): Promise<IProduct[]> => {
        const response = await axios.get<IProduct[]>(`${URL}?collectionId=${collectionId}`); // Use axios.get
        return response.data;

    }
);
/**
 * This is the action responsible for fetching products by its collection id and products limit.
 * @param collectionId - The id of the collection to fetch products from.
 * @param limit - The limit number.
 */
export const fetchLimitedCollectionProducts = createAsyncThunk(
    "products/fetchLimitedCollectionProducts",
    /**
     * Fetch the products from the JSON server by collection id and limit.
     * @param {collectionId: string; limit: number} - The id of the collection to fetch products from and the limit of products to fetch.
     * @returns {Promise<IProduct[]>} A promise that resolves to the fetched data.
     */
    async ({ collectionId, limit }: { collectionId: string; limit: number }): Promise<IProduct[]> => {
        const response = await axios.get<IProduct[]>(`${URL}?collectionId=${collectionId}&_start=1&_limit=${limit}`); // Use axios.get

        return response.data;
    }
)

/**
 * This is the action responsible for fetching products by its collection id and products limit.
 * @param collectionId - The id of the collection to fetch products from.
 */
export const fetchAlphabeticallySortedProducts = createAsyncThunk(
    "products/fetchAlphabeticallySortedProducts",
    /**
     * Fetch the products from the JSON server by collection id and limit.
     * @param {collectionId} - The id of the collection to fetch products 
     * @returns {Promise<IProduct[]>} A promise that resolves to the fetched data.
     */
    async (collectionId: string|undefined): Promise<IProduct[]> => {
        const response = await axios.get<IProduct[]>(`${URL}?collectionId=${collectionId}&_sort=name`); // Use axios.get

        return response.data;
    }
)

/**
 * This is the action responsible for fetching products by its collection id and products limit.
 * @param collectionId - The id of the collection to fetch products from.
 */
export const fetchPriceSortedProducts = createAsyncThunk(
    "products/fetchPriceSortedProducts",
    /**
     * Fetch the products from the JSON server by collection id and limit.
     * @param {collectionId} - The id of the collection to fetch products 
     * @returns {Promise<IProduct[]>} A promise that resolves to the fetched data.
     */
    async (collectionId: string|undefined): Promise<IProduct[]> => {
        const response = await axios.get<IProduct[]>(`${URL}?collectionId=${collectionId}&_sort=price`); // Use axios.get

        return response.data;
    }
)



/**
 * This is the action responsible for getting a product by its id.
 * @param {productId} - The id of the product to be fetched.
 */
export const getProductbyId = createAsyncThunk(
    "products/getProductbyId",
    /**
     * Get the product from the JSON server by id.
     * @param id - The id of the product to fetch.
     * @returns {Promise<IProduct>} A promise that resolves to the fetched data.
     */
    async (id: string): Promise<IProduct> => {
        const response = await axios.get<IProduct>(`${URL}/${id}`); // Use axios.get
        return response.data;
    }
)
/**
 * The is the action responsible for fetching all products.
 */
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    /**
     * Fetch the products from the JSON server.
     * @returns {Promise<IProduct[]>} A promise that resolves to the fetched data.
     */
    async (): Promise<IProduct[]> => {
        const response = await axios.get<IProduct[]>(URL); // Use axios.get
        return response.data;
    }
)

interface RateProductPayload {
    id: string;
    rates: number[];
  }
  
export const rateProduct = createAsyncThunk(
    'products/rateProduct',
    async ({ id, rates }: RateProductPayload) => {
      const response = await axios.patch(`${URL}/${id}`, { rates });
      return response.data;
    }
);

/**
 * The initial state of the products slice
 */
const initialState = {
    /**
     * An array of IProduct object representing the products
     * @type {IProduct[]}
     */
    products: [] as IProduct[],
    /**
     * A product that is fetched by id.
     * @type {IProduct}
     */
    product: {} as IProduct,
    /**
     * The status of the request.
     * @type {string}
     */
    status: "idle",
};
/**
 * The product slice of the redux store
 */
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        rateProduct(state, action){
            state.product.rates.push(action.payload);
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(fetchProductsByCollectionId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByCollectionId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProductsByCollectionId.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(fetchLimitedCollectionProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLimitedCollectionProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchLimitedCollectionProducts.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(getProductbyId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductbyId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.product = action.payload;
            })
            .addCase(getProductbyId.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(rateProduct.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(rateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedProduct = action.payload;
                state.products = state.products.map((product) =>
                  product.id === updatedProduct.id ? updatedProduct : product
                );
                if (state.product?.id === updatedProduct.id) {
                  state.product = updatedProduct;
                }
              })
              .addCase(rateProduct.rejected, (state, action) => {
                state.status = 'failed';
            }).addCase(fetchAlphabeticallySortedProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            }).addCase(fetchPriceSortedProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            });
    },
});
export default productSlice.reducer;
