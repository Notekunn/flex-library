import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IOrder, IOrderDetail, IOrderRequest, IResponseOrderDetail } from '../constants/interface';
import { profileAction } from './authSlice';

interface OrderState {
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  orderList: {
    [key in IOrderRequest['status']]: IOrder[];
  };
}

const initialState: OrderState = {
  loading: 'idle',
  orderList: {
    cancelled: [],
    completed: [],
    created: [],
    purchased: [],
  },
};

export const GetOrderByUserAction = createAsyncThunk('order/get-by-user', async (payload?: IOrderRequest) => {
  const { data } = await apiInstance.get<IOrder[]>('/order', {
    params: payload,
  });
  return data.filter((e) => e.orderDetails.length > 0);
});

export const UpdateOrderDetailAction = createAsyncThunk(
  'order-detail/create',
  async (payload: IOrderDetail, thunkApi) => {
    const { data } = await apiInstance.post<IOrder>('/order-detail', payload);
    thunkApi.dispatch(
      GetOrderByUserAction({
        status: 'created',
      }),
    );
    return data;
  },
);

export const PurchaseOrderAction = createAsyncThunk('order/purchase', async (id: number, thunkApi) => {
  const { data } = await apiInstance.post<IOrder>(`/order/${id}/purchase`);
  thunkApi.dispatch(
    GetOrderByUserAction({
      status: 'created',
    }),
  );
  thunkApi.dispatch(
    GetOrderByUserAction({
      status: 'purchased',
    }),
  );
  thunkApi.dispatch(profileAction());
  return data;
});

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetOrderByUserAction.pending, (state, action) => {
        state.loading = 'loading';
        state.message = undefined;
      })
      .addCase(GetOrderByUserAction.fulfilled, (state, action) => {
        state.loading = 'success';
        const orderType = action.meta.arg?.status || 'created';
        state.orderList[orderType] = action.payload;
      })
      .addCase(GetOrderByUserAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });

    builder
      .addCase(UpdateOrderDetailAction.pending, (state, action) => {
        state.loading = 'loading';
        state.message = '';
      })
      .addCase(UpdateOrderDetailAction.fulfilled, (state, action) => {
        state.loading = 'success';
        // const createdOrders = state.orderList.created;
        // const order = action.payload;

        // const nOfOrder = createdOrders.findIndex((e) => e.id === action.payload.id);

        // if (nOfOrder == -1) {
        //   state.orderList.created = [order, ...createdOrders];
        // } else {
        //   state.orderList.created = [...createdOrders.slice(0, nOfOrder), order, ...createdOrders.slice(nOfOrder + 1)];
        // }
      })
      .addCase(UpdateOrderDetailAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });

    builder
      .addCase(PurchaseOrderAction.pending, (state) => {
        state.loading = 'loading';
        state.message = 'null';
      })
      .addCase(PurchaseOrderAction.fulfilled, (state, action) => {
        state.loading = 'success';
        const currentOrder = state.orderList.created.find((e) => e.id === action.meta.arg);
        if (currentOrder) {
          state.orderList.purchased.unshift(currentOrder);
        }
        state.orderList.created = state.orderList.created.filter((e) => e.id != action.payload.id);
      })
      .addCase(PurchaseOrderAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default OrderSlice.reducer;

export const selectOrder = (status: IOrderRequest['status']) => (state: RootState) => state.order.orderList[status];
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderMessage = (state: RootState) => state.order.message;
