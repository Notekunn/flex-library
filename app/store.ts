import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import categoryReducer from '../reducers/categorySlice';
import storeReducer from '../reducers/storeSlice';
import bookReducer from '../reducers/bookSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    store: storeReducer,
    book: bookReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
