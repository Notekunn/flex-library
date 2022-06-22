import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IStore } from '../constants/interface';

export interface StoreState {
  data: IStore[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: StoreState = {
  data: [],
  loading: 'idle',
  message: undefined,
};

export const CreateStoreAction = createAsyncThunk('store/create', async (payload: IStore) => {
  const data = await apiInstance.post('/stores', payload);
  console.log(data);
  return data;
});

const StoreSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateStoreAction.pending, (state, action) => {
        state.loading = 'idle';
        state.message = undefined;
      })
      .addCase(CreateStoreAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload.data;
      })
      .addCase(CreateStoreAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default StoreSlice.reducer;

export const selectLoading = (state: RootState) => state.store.loading;
export const selectMessage = (state: RootState) => state.store.message;
export const selectData = (state: RootState) => state.store.data;
