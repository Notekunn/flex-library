import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IOrder, IOrderRequest } from '../constants/interface';
interface IOrderManagementRequest {
  status: 'created' | 'purchased' | 'cancelled' | 'completed';
}
interface OrderState {
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  orderList: { [key in IOrderRequest['status']]: IOrder[] };
}
const initialState: OrderState = {
  loading: 'idle',
  orderList: { cancelled: [], completed: [], created: [], purchased: [] },
};
export const GetAllOrderByStore = createAsyncThunk('order/store', async (payload: IOrderManagementRequest) => {
  const { data } = await apiInstance.get<IOrder[]>(`/order/store`, {
    params: payload,
  });
  return data;
});

const OrderManagementSlice = createSlice({
  initialState,
  name: 'OrderManagement',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllOrderByStore.pending, (state) => {
        state.loading = 'idle';
        state.message = undefined;
      })
      .addCase(GetAllOrderByStore.fulfilled, (state, action) => {
        state.loading = 'success';
        const orderType = action.meta.arg.status;
        state.orderList[orderType] = action.payload;
      })
      .addCase(GetAllOrderByStore.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default OrderManagementSlice.reducer;

export const selectOrder = (status: IOrderRequest['status']) => (state: RootState) =>
  state.orderManagement.orderList[status];
export const selectOrderLoading = (state: RootState) => state.orderManagement.loading;
export const selectOrderMessage = (state: RootState) => state.orderManagement.message;
