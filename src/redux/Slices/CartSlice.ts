import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../../models/cart-product.model';
import axios from 'axios';

interface CartState {
  products: CartProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  subtotal: number;
  total: number;
  shippingPrice: number;

}

const initialState: CartState = {
  products: [],
  status: 'idle',
  subtotal: 0,
  total: 0,
  shippingPrice: 0,

};

const baseUrl = 'http://localhost:3000/cart';

export const getProducts = createAsyncThunk<CartProduct[]>('cart/getProducts', async () => {
  const response = await axios.get<CartProduct[]>(baseUrl);
  return response.data;
});

// Increment quantity with a maximum limit of 5
export const incrementQuantity = createAsyncThunk<CartProduct, string>(
  'cart/incrementQuantity',
  async (productId: string) => {
    const productResponse = await axios.get<CartProduct>(`${baseUrl}/${productId}`);
    const product = productResponse.data;
    const updatedProduct = { ...product, quantity: product.quantity < 5 ? product.quantity + 1 : 5 };
    const response = await axios.put<CartProduct>(`${baseUrl}/${productId}`, updatedProduct);

    return response.data;
  }
);

// Decrement quantity with a minimum limit of 1
export const decrementQuantity = createAsyncThunk<CartProduct, string>(
  'cart/decrementQuantity',
  async (productId: string) => {
    const productResponse = await axios.get<CartProduct>(`${baseUrl}/${productId}`);
    const product = productResponse.data;
    const updatedProduct = { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1 };
    const response = await axios.put<CartProduct>(`${baseUrl}/${productId}`, updatedProduct);
    return response.data;
  }
);

// Handle updated quantity received from the input
export const handleUpdatedQuantity = createAsyncThunk<CartProduct, { productId: string, newQuantity: number }>(
  'cart/handleUpdatedQuantity',
  async ({ productId, newQuantity }) => {
    const productResponse = await axios.get<CartProduct>(`${baseUrl}/${productId}`);
    const product = productResponse.data;
    if(newQuantity<=5){
      const updatedProduct = { ...product, quantity: newQuantity };
      const response = await axios.put<CartProduct>(`${baseUrl}/${productId}`, updatedProduct);
      return response.data;
    }
    const updatedProduct = { ...product, quantity: 5};
    const response = await axios.put<CartProduct>(`${baseUrl}/${productId}`, updatedProduct);
    return response.data;
    
    

  }
);

export const removeProduct = createAsyncThunk<string, string>('cart/removeProduct', async (productId) => {
  await axios.delete(`${baseUrl}/${productId}`);
  return productId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateTotal(state) {
      state.subtotal = state.products.reduce((total, product) => {
        const price = typeof product.price === 'number' ? product.price : 0;
        const quantity = typeof product.quantity === 'number' ? product.quantity : 0;
        return total + price * quantity;
      }, 0);
    },
    calculateCheckoutTotal(state, action: PayloadAction<number>) {
      state.shippingPrice = action.payload;
      state.total = state.subtotal + state.shippingPrice;
    }
  

    addProductToCart(state: CartState, action:PayloadAction<CartProduct>){
      const product = action.payload      
      const productIndex = state.products.findIndex((cartProduct)=> cartProduct.id === product.id);
      if(productIndex !== -1){   
        state.products[productIndex].quantity += product.quantity;
        if(state.products[productIndex].quantity > 5){
          alert("only 5 items of that product added")
          state.products[productIndex].quantity = 5;
        }
      }
      else{
        state.products.push(product);
      }
      cartSlice.caseReducers.calculateTotal(state);       
    },

    buyProductNow(state: CartState, action:PayloadAction<CartProduct>){
      state.products = [];
      const product = action.payload;
      if(product.quantity > 5){
        alert("only 5 items of that product added")
        product.quantity = 5;
      }
      state.products.push(product);
      console.log(state.products.length);
      
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<CartProduct[]>) => {
        state.products = action.payload;
        state.status = 'succeeded';
        cartSlice.caseReducers.calculateTotal(state); // Recalculate total when products are fetched
      })
      .addCase(incrementQuantity.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        const updatedProduct = action.payload;
        const existingProductIndex = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (existingProductIndex !== -1) {
          state.products[existingProductIndex] = updatedProduct;
          cartSlice.caseReducers.calculateTotal(state);
        }
      })
      .addCase(decrementQuantity.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        const updatedProduct = action.payload;
        const existingProductIndex = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (existingProductIndex !== -1) {
          state.products[existingProductIndex] = updatedProduct;
          cartSlice.caseReducers.calculateTotal(state);
        }
      })
      .addCase(handleUpdatedQuantity.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        const updatedProduct = action.payload;
        const existingProductIndex = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (existingProductIndex !== -1) {
          state.products[existingProductIndex] = updatedProduct;
          cartSlice.caseReducers.calculateTotal(state);
        }
      })

      .addCase(removeProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        cartSlice.caseReducers.calculateTotal(state);
      });
  },
});


export const { calculateTotal, addProductToCart, buyProductNow, calculateCheckoutTotal } = cartSlice.actions;
export default cartSlice.reducer;
