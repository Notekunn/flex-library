import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IPaymentPackage } from '../constants/interface';

interface IPayMentPackageState {
  data: IPaymentPackage[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: IPayMentPackageState = {
  data: [],
  loading: 'idle',
};

export const GetAllPaymentPackagesAction = createAsyncThunk('payment/paymentPackage', async () => {
  const { data } = await apiInstance.get('/payment/payment-package');
  return data;
});

const PaymentPackageSlice = createSlice({
  name: 'paymentPackage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllPaymentPackagesAction.pending, (state, action) => {
        state.loading = 'loading';
        state.message = undefined;
      })
      .addCase(GetAllPaymentPackagesAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(GetAllPaymentPackagesAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default PaymentPackageSlice.reducer;

export const selectLoading = (state: RootState) => state.paymentPackage.loading;
export const selectData = (state: RootState) => state.paymentPackage.data;
export const selectMessage = (state: RootState) => state.paymentPackage.message;
