import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { PaymentIntent, PaymentIntentResult } from '@stripe/stripe-js';

export interface IPayMentIntentParams {
  amount: number;
  currency: string;
  payment_method_types: string[];
}

interface IPayMentState {
  data: any;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: IPayMentState = {
  data: undefined,
  loading: 'idle',
};

export const CreatePaymentAction = createAsyncThunk('payment/create', async (payload: IPayMentIntentParams) => {
  const { data } = await apiInstance.post('/payment', payload);
  return data;
});

const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreatePaymentAction.pending, (state, action) => {
        state.loading = 'loading';
        state.message = undefined;
      })
      .addCase(CreatePaymentAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(CreatePaymentAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export const selectLoading = (state: RootState) => state.payment.loading;
export const selectMessage = (state: RootState) => state.payment.message;
export const selectData = (state: RootState) => state.payment.data;

export const PaymentReducer = PaymentSlice.reducer;
