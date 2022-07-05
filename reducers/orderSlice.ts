import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IOrderDetail, IStore, IUser } from '../constants/interface';

interface OrderState {
  data: OrderResponse[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: OrderState = {
  data: [],
  loading: 'idle',
  message: undefined,
};

export interface OrderDetailResponse {
  quantity: number;
  book: {
    id: number;
    name: string;
    images: string[];
    author: string;
    rentPrice: number;
  };
}
export interface OrderResponse {
  store: {
    name: string;
    address: string;
    avatarURL?: string;
  };
  orderDetails: Array<OrderDetailResponse>;
  totalAmount: number;
}

export const GetOrderByUserAction = createAsyncThunk('order/get-by-user', async () => {
  const { data } = await apiInstance.get<OrderResponse[]>('/order');
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
