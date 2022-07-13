import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IBookLoanResponse, IReturnBook } from '../constants/interface';

interface InitialState {
  loading: 'idle' | 'loading' | 'success' | 'error';
  loans: IBookLoanResponse[];
  message?: string;
}

export const getAllAction = createAsyncThunk('loan/getall', async () => {
  const { data } = await apiInstance.get<IBookLoanResponse[]>('/loans');
  return data;
});

export const returnAction = createAsyncThunk('loan/return', async (payload: IReturnBook) => {
  const { data } = await apiInstance.post<IBookLoanResponse[]>('/loan/return', payload);
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
        state.loans = state.loans.filter((e) => e.bookCopy.barcode != action.meta.arg.barcode);
      })
      .addCase(returnAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default loanSlice.reducer;

export const selectLoading = (state: RootState) => state.loan.loading;
export const selectLoans = (state: RootState) => state.loan.loans;
export const selectError = (state: RootState) => state.loan.message;
