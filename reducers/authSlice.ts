import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { TOKEN_EXPIRED_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../constants/storageKey';
import { IUser } from '../types';

interface LoginOKResponse {
  user: IUser;
  token: {
    accessToken: string;
    accessTokenExpired: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  loading: 'idle' | 'loading' | 'success' | 'error';
  user?: IUser;
  error?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: 'idle',
};

export const loginAction = createAsyncThunk('login', async (payload: LoginPayload) => {
  const { data } = await apiInstance.post<LoginOKResponse>('/auth/login', payload);
  console.log(data);

  return data;
});

export const profileAction = createAsyncThunk('profile', async () => {
  const { data } = await apiInstance.get<IUser>('/user/me');
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler
      .addCase(loginAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(loginAction.fulfilled, (state, payload) => {
        state.loading = 'success';
        state.isLoggedIn = true;
        state.user = payload.payload.user;
        AsyncStorage.setItem(TOKEN_STORAGE_KEY, payload.payload.token.accessToken);
        AsyncStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, payload.payload.token.accessTokenExpired);
      })
      .addCase(loginAction.rejected, (state, payload) => {
        state.loading = 'error';
        state.error = payload.error.message;
      });

    buidler
      .addCase(profileAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(profileAction.fulfilled, (state, payload) => {
        state.loading = 'success';
        state.isLoggedIn = true;
        state.user = payload.payload;
      })
      .addCase(profileAction.rejected, (state, payload) => {
        state.loading = 'error';
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
