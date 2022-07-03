import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IStore, IUser } from '../constants/interface';

export interface StoreState {
  data: IStore[];
  mystore?: IStore;
  owner?: IUser;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: StoreState = {
  data: [],
  loading: 'idle',
  mystore: undefined,
  owner: undefined,
  message: undefined,
};

export const CreateStoreAction = createAsyncThunk('store/create', async (payload: IStore) => {
  const data = await apiInstance.post('/stores', payload);
  return data;
});

export const GetStoreByIdAction = createAsyncThunk('store/get-by-id', async (id: number) => {
  const data = await apiInstance.get(`/stores/${id}`);
  return data;
});

export const GetStoreByUserAction = createAsyncThunk('store/my-store', async () => {
  const data = await apiInstance.get('stores/mystore');
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
        state.mystore = action.payload.data;
      })
      .addCase(CreateStoreAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
    builder.addCase(GetStoreByUserAction.pending, (state, action) => {
      state.loading = 'idle';
      state.message = undefined;
    });
    builder.addCase(GetStoreByUserAction.fulfilled, (state, action) => {
      state.loading = 'success';
      state.mystore = action.payload.data;
    });
    builder.addCase(GetStoreByUserAction.rejected, (state, action) => {
      state.loading = 'error';
      state.message = action.error.message;
      state.mystore = undefined;
    });
    builder
      .addCase(GetStoreByIdAction.pending, (state, action) => {
        state.loading = 'idle';
        state.message = undefined;
      })
      .addCase(GetStoreByIdAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.owner = action.payload.data.owner;
      })
      .addCase(GetStoreByIdAction.rejected, (state, action) => {
        state.loading = 'error';
        state.message = action.error.message;
      });
  },
});

export default StoreSlice.reducer;

export const selectLoading = (state: RootState) => state.store.loading;
export const selectMessage = (state: RootState) => state.store.message;
export const selectData = (state: RootState) => state.store.data;
export const selectUserStore = (state: RootState) => state.store.mystore;
export const selectOwner = (state: RootState) => state.store.owner;
