import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IBook, ISearchBook, IStore } from '../constants/interface';

interface IUpdateBookPayload extends IBook {
  id: number;
}

interface IBookState {
  data: IBook[];
  store: IStore;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialState: IBookState = {
  data: [],
  store: {} as IStore,
  loading: 'idle',
};

export const CreateBookAction = createAsyncThunk('book/create', async (payload: IBook) => {
  const { data } = await apiInstance.post('/book', payload);
  return data;
});

export const UpdateBookAction = createAsyncThunk('book/update', async (payload: IUpdateBookPayload) => {
  const { id, ...dataUpdate } = payload;
  const { data } = await apiInstance.put(`/book/${id}`, dataUpdate);
  return data;
});

export const DeleteBookAction = createAsyncThunk('book/delete', async (id: number) => {
  const { data } = await apiInstance.delete(`/book/${id}`);
  return data;
});

export const GetBookAction = createAsyncThunk('book/get', async () => {
  const { data } = await apiInstance.get('/book');
  return data;
});

export const GetBookByIdAction = createAsyncThunk('book/getById', async (id: number) => {
  const { data } = await apiInstance.get(`/book/${id}`);
  return data;
});

export const GetBookByStoreAction = createAsyncThunk('book/getByStore', async (id: number) => {
  const { data } = await apiInstance.get(`/store/${id}/books`);
  return data;
});

export const GetBookByCategoryAction = createAsyncThunk('book/getByCategory', async (id: number) => {
  const { data } = await apiInstance.get(`/book/category/${id}`);
  return data;
});

export const SearchBookAction = createAsyncThunk('book/search', async (payload: ISearchBook) => {
  const { data } = await apiInstance.get(
    `/book?page=${payload.page}&take=${payload.take}&q=${payload.query}&sort=${payload.sort}`,
  );
  return data;
});

const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [
      CreateBookAction,
      UpdateBookAction,
      DeleteBookAction,
      GetBookAction,
      GetBookByStoreAction,
      GetBookByCategoryAction,
      SearchBookAction,
    ].forEach((action) => {
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
    builder.addCase(GetBookByIdAction.pending, (state, action) => {
      state.loading = 'idle';
      state.message = undefined;
    });
    builder.addCase(GetBookByIdAction.fulfilled, (state, action) => {
      state.loading = 'success';
      state.store = action.payload.store;
    });
    builder.addCase(GetBookByIdAction.rejected, (state, action) => {
      state.loading = 'error';
      state.message = action.error.message;
    });
  },
});

export default BookSlice.reducer;

export const selectBook = (state: RootState) => state.book.data;
export const selectBookLoading = (state: RootState) => state.book.loading;
export const selectBookMessage = (state: RootState) => state.book.message;
export const selectBookStore = (state: RootState) => state.book.store;
