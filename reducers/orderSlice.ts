import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IOrder, IOrderDetail, IResponseOrderDetail } from '../constants/interface';

interface OrderState {
  orders: IOrder[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: OrderState = {
  orders: [],
  loading: 'idle',
  message: undefined,
};

export const GetOrderByUserAction = createAsyncThunk('order/get-by-user', async () => {
  const { data } = await apiInstance.get<IOrder[]>('/order');
  return data.filter((e) => e.orderDetails.length > 0);
});

export const UpdateOrderDetailAction = createAsyncThunk('order-detail/create', async (payload: IOrderDetail) => {
  const { data } = await apiInstance.post<IOrder>('/order-detail', payload);
  return data;
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
        state.orders = action.payload;
      })
      .addCase(GetOrderByUserAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });

    builder
      .addCase(UpdateOrderDetailAction.pending, (state, action) => {
        state.loading = 'idle';
        state.message = '';
      })
      .addCase(UpdateOrderDetailAction.fulfilled, (state, action) => {
        state.loading = 'success';
        const order = action.payload;

        const nOfOrder = state.orders.findIndex((e) => e.id === action.payload.id);

        if (nOfOrder == -1) {
          state.orders = [order, ...state.orders];
        } else {
          state.orders = [
            ...state.orders.slice(0, nOfOrder),
            {
              ...state.orders[nOfOrder],
              orderDetails: order.orderDetails,
            },
            ...state.orders.slice(nOfOrder + 1),
          ];
        }
      })
      .addCase(UpdateOrderDetailAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default OrderSlice.reducer;

export const selectOrder = (state: RootState) => state.order.orders;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderMessage = (state: RootState) => state.order.message;
