import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IStore, IUser } from '../constants/interface';

export interface StoreState {
  myStore?: IStore;
  currentStore?: IStore;
  owner?: IUser;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: StoreState = {
  loading: 'idle',
};

export const CreateStoreAction = createAsyncThunk('store/create', async (payload: IStore) => {
  const data = await apiInstance.post<IStore>('/stores', payload);
  return data;
});

export const GetStoreByIdAction = createAsyncThunk('store/get-by-id', async (id: number) => {
  const { data } = await apiInstance.get<IStore>(`/stores/${id}`);
  return data;
});

export const GetStoreByUserAction = createAsyncThunk('store/my-store', async () => {
  const data = await apiInstance.get<IStore>('stores/mystore');
  return data;
});

export const UpdateStoreAction = createAsyncThunk('store/update', async (payload: Partial<IStore>) => {
  const { data } = await apiInstance.patch<IStore>(`/stores/${payload.id}`, payload);
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
        state.myStore = action.payload.data;
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
      state.myStore = action.payload.data;
    });
    builder.addCase(GetStoreByUserAction.rejected, (state, action) => {
      state.loading = 'error';
      state.message = action.error.message;
      state.myStore = undefined;
    });
    builder
      .addCase(GetStoreByIdAction.pending, (state, action) => {
        state.loading = 'idle';
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
      .addCase(UpdateStoreAction.fulfilled, (state, action) => {
        state.loading = 'success';
        state.myStore = action.payload;
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
export const selectUserStore = (state: RootState) => state.store.myStore;
export const selectOwner = (state: RootState) => state.store.owner;
