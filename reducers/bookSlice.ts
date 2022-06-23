import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IBook } from '../constants/interface';

interface IUpdateBookPayload extends IBook {
  id: number;
}

interface IBookState {
  data: IBook[];
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: IBookState = {
  data: [],
  loading: 'idle',
};

const CreateBookAction = createAsyncThunk('book/create', async (payload: IBook) => {
  const { data } = await apiInstance.post('/book', payload);
  return data;
});

const UpdateBookAction = createAsyncThunk('book/update', async (payload: IUpdateBookPayload) => {
  const { id, ...dataUpdate } = payload;
  const { data } = await apiInstance.put(`/book/${id}`, dataUpdate);
  return data;
});

const DeleteBookAction = createAsyncThunk('book/delete', async (id: number) => {
  const { data } = await apiInstance.delete(`/book/${id}`);
  return data;
});

const GetBookAction = createAsyncThunk('book/get', async () => {
  const { data } = await apiInstance.get('/book');
  return data;
});

const GetBookByIdAction = createAsyncThunk('book/getById', async (id: number) => {
  const { data } = await apiInstance.get(`/book/${id}`);
  return data;
});

const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [CreateBookAction, UpdateBookAction, DeleteBookAction, GetBookAction, GetBookByIdAction].forEach((action) => {
      builder
        .addCase(action.pending, (state, action) => {
          state.loading = 'idle';
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

export default BookSlice.reducer;

const selectBook = (state: RootState) => state.book.data;
const selectBookLoading = (state: RootState) => state.book.loading;
const selectBookMessage = (state: RootState) => state.book.message;
