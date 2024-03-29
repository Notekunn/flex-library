import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IBook, IBookResponse, ISearchBook, IStore } from '../constants/interface';

interface IBookState {
  books: IBookResponse[];
  book?: IBookResponse;
  loading: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  searchQuery: string;
}

const initialState: IBookState = {
  books: [],
  loading: 'idle',
  searchQuery: '',
};

export const CreateBookAction = createAsyncThunk('book/create', async (payload: Omit<IBook, 'id'>) => {
  const { data } = await apiInstance.post('/book', payload);
  return data;
});

export const UpdateBookAction = createAsyncThunk(
  'book/update',
  async (payload: Partial<IBook> & { id: number }, thunkApi) => {
    const { id, ...dataUpdate } = payload;
    const { data } = await apiInstance.patch(`/book/${id}`, dataUpdate);
    thunkApi.dispatch(GetBookByIdAction(id));
    return data;
  },
);

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

export const GetBookByStoreAction = createAsyncThunk(
  'book/getByStore',
  async (payload: Partial<ISearchBook> & { id: number }) => {
    const { id, ...searchPayload } = payload;
    const { data } = await apiInstance.get(`/store/${id}/books`, {
      params: searchPayload,
    });
    return data;
  },
);

export const GetBookByCategoryAction = createAsyncThunk('book/getByCategory', async (id: number) => {
  const { data } = await apiInstance.get(`/book/category/${id}`);
  return data;
});

export const SearchBookAction = createAsyncThunk('book/search', async (payload: ISearchBook) => {
  const { data } = await apiInstance.get(`/book`, {
    params: payload,
  });
  return data;
});

const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    [GetBookAction, GetBookByStoreAction, GetBookByCategoryAction, SearchBookAction].forEach((act) => {
      builder
        .addCase(act.pending, (state, action) => {
          state.loading = 'loading';
          state.message = undefined;
        })
        .addCase(act.fulfilled, (state, action) => {
          state.loading = 'success';
          state.books = action.payload;
        })
        .addCase(act.rejected, (state, action) => {
          state.loading = 'error';
          state.message = action.error.message;
        });
    });
    builder.addCase(GetBookByIdAction.pending, (state) => {
      state.loading = 'loading';
      state.message = undefined;
    });
    builder.addCase(GetBookByIdAction.fulfilled, (state, action) => {
      state.loading = 'success';
      state.book = action.payload;
    });
    builder.addCase(GetBookByIdAction.rejected, (state, action) => {
      state.loading = 'error';
      state.message = action.error.message;
    });
  },
});

export const { setSearchQuery } = BookSlice.actions;

export default BookSlice.reducer;

export const selectSearchQuery = (state: RootState) => state.book.searchQuery;
export const selectBooks = (state: RootState) => state.book.books;
export const selectBookLoading = (state: RootState) => state.book.loading;
export const selectBookMessage = (state: RootState) => state.book.message;
export const selectBook = (state: RootState) => state.book.book;
