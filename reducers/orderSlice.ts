import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IOrder } from '../constants/interface';

interface OrderState {
  data: IOrder[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: OrderState = {
  data: [],
  loading: 'idle',
  message: undefined,
};

export const GetOrderByUserAction = createAsyncThunk('order/get-by-user', async () => {
  const { data } = await apiInstance.get<IOrder[]>('/order');
  return data.filter((e) => e.orderDetails.length > 0);
});

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetOrderByUserAction.pending, (state, action) => {
        state.loading = 'idle';
        state.message = undefined;
      })
      .addCase(GetOrderByUserAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(GetOrderByUserAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default OrderSlice.reducer;

export const selectOrder = (state: RootState) => state.order.data;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderMessage = (state: RootState) => state.order.message;
