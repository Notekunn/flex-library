import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IOrderDetail, IUser } from '../constants/interface';

interface orderDetailState {
  data: IOrderDetail;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: orderDetailState = {
  data: {} as IOrderDetail,
  loading: 'idle',
  message: undefined,
};

export const CreateOrderDetailAction = createAsyncThunk('order-detail/create', async (payload: IOrderDetail) => {
  const { data } = await apiInstance.post('/order-detail', payload);
  return data;
});

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrderDetailAction.pending, (state, action) => {
        state.loading = 'idle';
        state.message = undefined;
      })
      .addCase(CreateOrderDetailAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(CreateOrderDetailAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default orderDetailSlice.reducer;

export const selectOrderDetail = (state: RootState) => state.orderDetail.data;
export const selectOrderDetailLoading = (state: RootState) => state.orderDetail.loading;
export const selectOrderDetailMessage = (state: RootState) => state.orderDetail.message;
