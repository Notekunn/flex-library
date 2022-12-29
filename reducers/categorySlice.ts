import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { ICategory } from '../constants/interface';

interface IUpdateCategoryPayload extends Partial<ICategory> {
  id: number;
}

interface CategoryState {
  data: ICategory[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: CategoryState = {
  data: [],
  loading: 'idle',
};

export const GetAllCategoryAction = createAsyncThunk('category/get', async () => {
  const { data } = await apiInstance.get('/category');
  return data;
});

export const GetOneCategoryAction = createAsyncThunk('category/getOne', async (id: number) => {
  const { data } = await apiInstance.get(`/category/${id}`);
  return data;
});

export const CreateCategoryAction = createAsyncThunk('category/create', async (payload: ICategory) => {
  const { data } = await apiInstance.post('/category', payload);
  return data;
});

export const UpdateCategoryAction = createAsyncThunk('category/update', async (payload: IUpdateCategoryPayload) => {
  const { id, ...dataUpdate } = payload;
  const { data } = await apiInstance.put(`/category/${id}`, dataUpdate);
  return data;
});

export const DeleteCategoryAction = createAsyncThunk('category/delete', async (id: number) => {
  const { data } = await apiInstance.delete(`/category/${id}`);
  return data;
});

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [GetAllCategoryAction, GetOneCategoryAction].forEach((action) => {
      builder
        .addCase(action.pending, (state, action) => {
          state.loading = 'loading';
          state.message = undefined;
        })
        .addCase(action.fulfilled, (state, action) => {
          state.loading = 'success';
          state.data = action.payload;
        })
        .addCase(action.rejected, (state, action) => {
          state.loading = 'error';
          state.message = action.error.message;
        });
    });
  },
});

export default CategorySlice.reducer;

export const selectLoading = (state: RootState) => state.category.loading;
export const selectData = (state: RootState) => state.category.data;
export const selectMessage = (state: RootState) => state.category.message;
