import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import categoryReducer from '../reducers/categorySlice';
import storeReducer from '../reducers/storeSlice';
import bookReducer from '../reducers/bookSlice';
import orderReducer from '../reducers/orderSlice';
import orderDetailReducer from '../reducers/orderDetailSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    store: storeReducer,
    book: bookReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
