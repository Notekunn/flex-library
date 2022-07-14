import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IBookLoanResponse, IOrderBookLoanResponse, IReturnBook } from '../constants/interface';

interface InitialState {
  loading: 'idle' | 'loading' | 'success' | 'error';
  loans: IBookLoanResponse[];
  orderLoan?: IOrderBookLoanResponse;
  message?: string;
}

export const getAllAction = createAsyncThunk('loan/getall', async () => {
  const { data } = await apiInstance.get<IBookLoanResponse[]>('/loans');
  return data;
});

export const getOrderLoanAction = createAsyncThunk('loan/order', async (orderId: number) => {
  const { data } = await apiInstance.get<IOrderBookLoanResponse>(`/order/${orderId}/loans`);
  return data;
});

export const returnAction = createAsyncThunk('loan/return', async (payload: IReturnBook, thunkApi) => {
  const { data } = await apiInstance.post<IBookLoanResponse[]>('/loans/return', payload);
  thunkApi.dispatch(getAllAction());
  return data;
});

export const confirmOrderAction = createAsyncThunk('loan/confirm', async (orderId: number, thunkApi) => {
  const { data } = await apiInstance.post<IBookLoanResponse[]>(`/order/${orderId}/loans`);
  thunkApi.dispatch(getOrderLoanAction(orderId));
  return data;
});
export const denyOrderAction = createAsyncThunk('loan/confirm', async (orderId: number, thunkApi) => {
  const { data } = await apiInstance.delete<IBookLoanResponse[]>(`/order/${orderId}/loans`);
  thunkApi.dispatch(getOrderLoanAction(orderId));
  return data;
});
const initialState: InitialState = {
  loading: 'idle',
  loans: [],
};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAction.pending, (state) => {
        state.loading = 'loading';
        state.message = '';
      })
      .addCase(getAllAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.loans = action.payload;
      })
      .addCase(getAllAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });

    builder
      .addCase(returnAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(returnAction.fulfilled, (state, action) => {
        state.loading = 'success';
        // state.loans = state.loans.filter((e) => e.bookCopy.barcode != action.meta.arg.barcode);
      })
      .addCase(returnAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });

    builder
      .addCase(getOrderLoanAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getOrderLoanAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.orderLoan = action.payload;
      })
      .addCase(getOrderLoanAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default loanSlice.reducer;

export const selectLoading = (state: RootState) => state.loan.loading;
export const selectLoans = (state: RootState) => state.loan.loans;
export const selectOrderLoans = (state: RootState) => state.loan.orderLoan;
export const selectError = (state: RootState) => state.loan.message;
