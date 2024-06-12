// src/redux/orderSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Order from '../../models/IOrder';

interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
};

// Async thunk to submit order
export const submitOrder = createAsyncThunk<
  Order,
  Order,
  { rejectValue: string }
>(
  'order/submitOrder',
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/order', order);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to submit order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Correctly handle rejected payload type
      });
  },
});

export default orderSlice.reducer;
