import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IStore, IStoreResponse, IUser } from '../constants/interface';
import { profileAction } from './authSlice';

export interface StoreState {
  currentStore?: IStoreResponse;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: StoreState = {
  loading: 'idle',
};

export const CreateStoreAction = createAsyncThunk('store/create', async (payload: IStore, thunkApi) => {
  const data = await apiInstance.post<IStoreResponse>('/stores', payload);
  thunkApi.dispatch(profileAction());
  return data;
});

export const GetStoreByIdAction = createAsyncThunk('store/get-by-id', async (id: number) => {
  const { data } = await apiInstance.get<IStoreResponse>(`/stores/${id}`);
  return data;
});

export const UpdateStoreAction = createAsyncThunk('store/update', async (payload: Partial<IStore>, thunkApi) => {
  const { data } = await apiInstance.patch<IStoreResponse>(`/stores/${payload.id}`, payload);
  thunkApi.dispatch(profileAction());
  return data;
});

const StoreSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateStoreAction.pending, (state, action) => {
        state.loading = 'loading';
        state.message = undefined;
      })
      .addCase(CreateStoreAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(GetStoreByIdAction.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(GetStoreByIdAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.currentStore = action.payload;
      })
      .addCase(GetStoreByIdAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder
      .addCase(UpdateStoreAction.pending, (state, action) => {
        state.loading = 'idle';
        state.message = undefined;
      })
      .addCase(UpdateStoreAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default StoreSlice.reducer;

export const selectLoading = (state: RootState) => state.store.loading;
export const selectMessage = (state: RootState) => state.store.message;
export const selectCurrentStore = (state: RootState) => state.store.currentStore;
