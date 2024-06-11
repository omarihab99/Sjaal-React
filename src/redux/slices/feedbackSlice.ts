// src/redux/feedbackSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Feedback from '../../models/IFeedback';

interface FeedbackState {
  feedbacks: Feedback[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: FeedbackState = {
  feedbacks: [],
  status: 'idle',
  error: null,
};

// Async thunk to submit feedback
export const submitFeedback = createAsyncThunk<
  Feedback,
  Feedback,
  { rejectValue: string }
>(
  'feedback/submitFeedback',
  async (feedback, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/feedback', feedback);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to submit feedback');
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFeedback.fulfilled, (state, action: PayloadAction<Feedback>) => {
        state.status = 'succeeded';
        state.feedbacks.push(action.payload);
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Correctly handle rejected payload type
      });
  },
});

export default feedbackSlice.reducer;
