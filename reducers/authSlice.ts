import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IUser } from '../constants/interface';
import { TOKEN_EXPIRED_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../constants/storageKey';

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

interface RegisterPayload extends LoginPayload {
  name: string;
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

export const loginAction = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  const { data } = await apiInstance.post<LoginOKResponse>('/auth/login', payload);
  console.log('loginAction', data);
  return data;
});
export const registerAction = createAsyncThunk('auth/register', async (payload: RegisterPayload) => {
  const { data } = await apiInstance.post<LoginOKResponse>('/auth/register', payload);
  console.log('registerAction', data);
  return data;
});

export const profileAction = createAsyncThunk('auth/profile', async () => {
  const { data } = await apiInstance.get<IUser>('/user/me');
  return data;
});

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  await AsyncStorage.removeItem(TOKEN_EXPIRED_STORAGE_KEY);
});

export const updateUserAction = createAsyncThunk('auth/updateUser', async (payload: IUser) => {
  const { data } = await apiInstance.put<IUser>(`/user/${payload.id}`, payload);
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    [loginAction, registerAction].forEach((act) => {
      buidler
        .addCase(act.pending, (state) => {
          state.loading = 'loading';
          state.error = undefined;
        })
        .addCase(act.fulfilled, (state, payload) => {
          state.loading = 'success';
          state.isLoggedIn = true;
          state.user = payload.payload.user;
          AsyncStorage.setItem(TOKEN_STORAGE_KEY, payload.payload.token.accessToken);
          AsyncStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, payload.payload.token.accessTokenExpired);
        })
        .addCase(act.rejected, (state, payload) => {
          state.loading = 'error';
          state.error = payload.error.message;
        });
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

    buidler
      .addCase(logoutAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = 'success';
      })
      .addCase(logoutAction.rejected, (state) => {
        state.loading = 'error';
      });
    buidler
      .addCase(updateUserAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(updateUserAction.fulfilled, (state, payload) => {
        state.loading = 'success';
        state.user = payload.payload;
      })
      .addCase(updateUserAction.rejected, (state, payload) => {
        state.loading = 'error';
        state.error = payload.error.message;
      });
  },
});

export default authSlice.reducer;

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
